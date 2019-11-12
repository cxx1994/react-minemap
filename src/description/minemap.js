/**
 * minemap 的方法注释
 * 并且使编译器不报错
 * 并没有实际的用途
 * @link http://minedata.cn/api/static/doc/js/v2.0.0/base/classes/Map.html
 */

((global) => {
    const minemap = {
        // 编辑插件
        edit: {
            init() {

            },
            draw: {
                deleteAll() {
                }
            },
            onBtnCtrlActive() {
            },
            dispose() {
            }
        },
        // 绘制特殊图层使用
        Template: {},
        chart: {},
        addImage() {
        },
        flyTo() {
        },
        fitBounds() {
        },

        getLayer() {
        },
        addLayer() {
        },
        removeLayer() {
        },

        addMarker() {
        },
        addMarkers() {
        },
        removeMarker() {
        },
        removeMarkers() {
        },

        addSource() {
        },
        getSource() {
        },
        removeSource() {
        },

        getPopup() {
        },
        togglePopup() {
        },

        setStyle() {
        },

        /**
         * @description 样式是否加载完成
         * @return {Boolean}
         */
        isStyleLoaded() {
        },

        addControl(control) {
            control.onAdd();
            control.onRemove();
        },
        removeControl() {

        },
        getCanvas() {
        },
        queryRenderedFeatures() {
        },
        easeTo() {
        },
        getMinZoom() {
        },
        getMaxZoom() {
        },
        setLayoutProperty() {
        },
        setPaintProperty() {
        },
        loadImage() {
        },
        setBearing() {
        },
        setPitch() {
        },
    };

    class Map {
        constructor(options) {
            this.options = options;
        }

        // addControl= emptyFunc;
        // getCanvas = emptyFunc;
    }

    class Marker {
        constructor(element, options) {
            this.element = element;
            this.options = options;
        }

        setLngLat() {
        };

        setPopup() {
        };
    }

    /**
     * @description minemap的信息窗
     */
    class Popup {
        constructor(options) {
            this.options = options;
        }


        /**
         * @description 是否打开
         * @return {Boolean}
         */
        isOpen() {
        };


        /**
         * @description 设置信息窗的文字内容内容
         * @param {String} text
         * @return {Popup}
         */
        setText(text) {
        };


        /**
         * @description 设置信息窗的dom内容
         * @param {Element} element
         * @return {Popup}
         */
        setDOMContent(element) {
        };


        /**
         * @description 设置经纬度
         * @param {Array}coordinate 经纬度
         * @return {Popup}
         */
        setLngLat(coordinate) {
        };


        /**
         * @description 添加到地图实例上
         * @param {minemap} minemap 一个Minemap的实例
         */
        addTo(minemap) {
        };
    }

    class Navigation {
    }

    class Scale {
    }

    class Fullscreen {
    }

    minemap.Map = Map;
    minemap.Marker = Marker;
    minemap.Popup = Popup;
    minemap.Navigation = Navigation;
    minemap.Scale = Scale;
    minemap.Fullscreen = Fullscreen;
    global.minemap = minemap;
})(window);
