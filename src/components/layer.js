import Component from './component';
import {
    removeLayers,
    removeSources,
    updateSource,
    isObject,
    isEqual,
    clone,
} from "../core/util";

class Layer extends Component {
    static defaultProps = {
        cursor: 'pointer' // layer hover时的鼠标样式
    };

    options = [
        'id',            // id
        'type',          // layer的类型
        'source',        // 资源
        'minzoom',       // 可以显示这个layer的最小zoom
        'maxzoom',       // 可以显示这个layer的最大zoom
        'layout',        // layout
        'paint',         // paint
        'filter',        // filter
        'source-layer',  // ?
    ];

    _heightLightIndex = null; // 高亮的feature的index

    _draggingFlag = false;  // 标记鼠标拖拽

    _draggingIndex = null;  // 鼠标拖拽的feature的index

    _cursorOverLayerFlag = false; // 标记鼠标是否在图层上面

    componentDidMount() {
        this.initIcons().then(() => {
            this.initialize();
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const currProps = this.props;
        const map = currProps.map;
        const id = currProps.id;

        // change source
        if (isObject(currProps.source) && !isEqual(currProps.source, prevProps.source)) {
            this.updateSource(currProps.source, true);
        }

        // change layout
        if (!isEqual(currProps.layout, prevProps.layout)) {
            Object.entries(currProps.layout).forEach(([key, value]) => {
                if (value !== prevProps.layout[key]) {
                    map.setLayoutProperty(id, key, value);
                }
            })
        }

        // change paint
        if (!isEqual(currProps.paint, prevProps.paint)) {
            Object.entries(currProps.paint).forEach(([key, value]) => {
                if (value !== prevProps.paint[key]) {
                    map.setPaintProperty(id, key, value);
                }
            })
        }
    }

    componentWillUnmount() {
        this.destroy();
    }

    destroy() {
        const { map, id } = this.props;

        // 移除layer
        removeLayers(map, id);

        // 移除source
        removeSources(map, id);

        // 移除所有绑定的事件
        this.unbindEvents(map);

        // 移除hover的时候鼠标样式的监听
        map.removeCursorLayer(id);

        // todo: 是否还要移除添加的自定义icon？
    }

    initialize() {
        const { map, cursor, events, draggable, emphasis } = this.props;

        // layer的配置项
        const options = this.getOptions(this.options);

        // 添加layer
        map.addLayer(options);

        // 绑定事件到map上
        this.bindEvents(map, events, this.props.id);

        // 是否设置hover的时候鼠标样式
        if (cursor) {
            map.addCursorLayer(this.props.id, this.props.cursor);
        }

        // 如果可以拖拽或者有高亮效果则添加处理事件
        if (draggable || emphasis) {
            this.source = this.getSource(true);
            const _events = {
                mousemove: this.handleMapMousemove
            };

            if (draggable) {
                _events.mousedown = this.handleMapMousedown;
            }
            this.bindEvents(map, _events, this.props.id)
        }
    }

    // 地图鼠标移动事件
    handleMapMousemove(e, map, features) {
        if (features.length) {
            const index = this.findIndexByFeature(features[0]);

            this.heightLight(index);
            this._dragStart(index);
        } else {
            this._dragEnd();
            this.downPlay();
        }
    };

    // 地图鼠标按下事件
    handleMapMousedown() {
        if (!this._cursorOverLayerFlag) {
            return;
        }

        this._draggingFlag = true;
        this.props.map.getCanvas().style.cursor = 'grab';

        this.props.map.on('mousemove', this.mouseMovePoint);
        this.props.map.once('mouseup', this.mouseUpPoint);
    }

    mouseMovePoint = (e) => {
        if (!this._draggingFlag) {
            return;
        }

        this.props.map.getCanvas().style.cursor = 'grabbing';

        const source = this.source;
        source.data.features[this._draggingIndex].geometry.coordinates = [e.lngLat.lng, e.lngLat.lat];
        this.updateSource(source);
    };

    mouseUpPoint = () => {
        if (!this._draggingFlag) {
            return;
        }

        this.props.map.getCanvas().style.cursor = '';
        this._draggingFlag = false;
        this.props.map.off('mousemove', this.mouseMovePoint);
    };

    // 开始拖拽
    _dragStart(index) {
        if (!this.props.draggable || index < 0) {
            return;
        }
        this._draggingIndex = index;
        this._cursorOverLayerFlag = true;
        this.props.map['dragPan'].disable();
    }

    // 结束拖拽
    _dragEnd() {
        if (!this.props.draggable) {
            return;
        }
        this._cursorOverLayerFlag = false;
        this.props.map['dragPan'].enable();
    }

    /**
     * 是否可以高亮
     * 需要props传递emphasis参数
     * 而且每个features的properties存在且不一样
     */
    _hasEmphasis() {
        return !!this.props['emphasis'];
    }

    /**
     * 获取当前layer的source
     * @param {Boolean} isClone 是否需要的是clone后的
     * @return {Object}
     */
    getSource(isClone = false) {
        const { source } = this.props;

        if (isObject(source)) {
            return isClone ? clone(source) : source;
        } else {
            return this.props.map.getSource(source)._options;
        }
    }

    updateSource(source, isClone) {
        updateSource(this.props.map, this.props.id, source);
        this.source = isClone ? clone(source) : source;
    }

    // todo：高亮和移动的feature是通过每个feature的properties来找到的
    //  所以每个feature的properties必须不一样，不然永远都是高亮或者移动第一个feature
    //  一个简单的处理方式是给每个feature的properties加一个不一样的id
    findIndexByFeature(feature) {
        let source = this.source;

        return source.data.features.findIndex(item => feature.properties.id === item.properties.id);
    }

    // 高亮某个feature
    heightLight(index) {
        if (!this._hasEmphasis() || index < 0 || this._heightLightIndex === index) {
            return;
        }

        this.downPlay();

        let source = this.source;

        let _feature = source.data.features[index];

        _feature.properties = Object.assign(_feature.properties, this.props['emphasis']);

        this.updateSource(source);

        this._heightLightIndex = index;
    }

    // 去除高亮
    downPlay() {
        if (!this._hasEmphasis()) {
            return;
        }

        if (this._heightLightIndex !== null) {
            let source = this.source;
            let _feature = source.data.features[this._heightLightIndex];
            let preFeature = this.getSource().data.features[this._heightLightIndex];
            if (!preFeature) {
                return;
            }
            _feature.properties = clone(preFeature.properties);
            this.updateSource(source);
            this._heightLightIndex = null;
        }
    }

    // 添加自定义icon
    initIcons() {
        const { icons, map } = this.props;

        if (icons) {
            const promiseList = Object.entries(icons).map(([id, imageSrc]) => {
                return new Promise((resolve, reject) => {
                    map.loadImage(imageSrc, function (error, image) {
                        if (error) {
                            reject();
                        } else {
                            try {
                                map.addImage(id, image);
                            } catch (e) {
                                console.log(e);
                            }
                            resolve();
                        }
                    })
                })
            });

            return Promise.all(promiseList);
        }

        return Promise.resolve();
    }
}

export default Layer;