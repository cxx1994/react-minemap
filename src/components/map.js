import React from "react";
import Component from "./component";
import { mixin } from "../core/util";
import LayerCursorable from '../mixin/LayerCursorable';

class Map extends Component {
    static defaultProps = {
        container: 'minemap-container',
        cursor: null,
    };

    state = {
        loaded: false
    };

    toggleMethods = {
        enableDrag: ['enableDrag', 'disableDrag'],
    };

    options = [
        'container',
        'styleUrl', // style地址
        'center', // 地图中心的经纬度
        'zoom', // 地图缩放级别
        'minZoom', // 地图最小缩放级别
        'maxZoom', // 地图最大缩放级别
        'pitch', // 鹰眼地图
        'bearing', // 初始化的地图旋转角度
        'logoControl',
        'hash',
        'interactive',
        'bearingSnap',
        'classes',
        'attributionControl',
        'failIfMajorPerformanceCaveat',
        'preserveDrawingBuffer',
        'maxBounds',
        'scrollZoom',
        'boxZoom',
        'dragRotate',
        'dragPan',
        'keyboard',
        'doubleClickZoom',
        'touchZoomRotate',
        'trackResize',
        'refreshExpiredTiles',
        'maxTileCacheSize',
        'localIdeographFontFamily',
    ];

    componentDidMount() {
        this.initialize();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const currProps = this.props;

        if (currProps.enableDrag !== prevProps.enableDrag) {
            this.bindToggleMeghods(this.map, this.toggleMethods);
        }

        if (currProps.bearing !== prevProps.bearing) {
            this.map.setBearing(currProps.bearing);
        }

        if (currProps.pitch !== prevProps.pitch) {
            this.map.setPitch(currProps.pitch);
        }

        if (currProps.cursor !== null && currProps.cursor !== this.map.getCanvas().style.cursor) {
            this.map.getCanvas().style.cursor = currProps.cursor;
        }
    }

    componentWillUnmount() {
        this.destroy();
    }

    destroy() {
        this.map && this.map.remove();
    }

    initialize() {
        const options = this.getOptions(this.options);

        options.style = options.styleUrl;

        this.map = new window.minemap.Map(options);

        this.map.on("load", this.handleLoaded.bind(this));

        this.bindToggleMethods(this.map, this.toggleMethods);

        this.bindEvents(this.map, this.props.events);

        // 添加layer hover 时鼠标抓手
        mixin(this.map, LayerCursorable, false);
        LayerCursorable.call(this.map);

        window.myMap = this.map;
    };

    handleLoaded() {
        this.setState({
            loaded: true
        })
    }

    renderChildren() {
        const { children } = this.props;

        if (!children || !this.map || !this.state.loaded) return;

        return React.Children.map(children, child => {

            if (!child) {
                return;
            }

            if (typeof child.type === 'string') {
                return child;
            } else {
                return React.cloneElement(child, {
                    map: this.map
                });
            }

        })
    }

    render() {
        const styles = {
            height: '100%',
        };

        return (
            <div style={this.props.style || styles}>
                <div
                    id={this.props.container}
                    className={this.props.className}
                    style={{ height: "100%" }}
                >
                    {this.renderChildren()}
                </div>
            </div>
        )
    }
}

export default Map;