/**
 * @file 基础组件对象
 * @author sincer(xingxuc@gmail.com)
 */
import { Component } from 'react';
import { isArray, isEqual } from "../core/util";

class BaseComponent extends Component {
    constructor(args) {
        super(args);
        this.events = {};
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { map: map1, children: children1, ...np } = nextProps;
        const { map: map2, children: children2, ...pp } = this.props;
        const res = isEqual(np, pp);
        return !res;
    }

    /**
     * 给某个对象绑定对应需要的事件
     * @param obj 需要绑定事件的对象
     * @param events 事件名数组
     * @param layers layer id 数组，传递了这个参数会返回这些layer中触发事件的features（layer组件使用）
     * @return null;
     */
    bindEvents(obj, events, layers) {
        const self = this;

        if (events) {
            Object.entries(events).forEach(([key, _func]) => {
                let func = function (e) {
                    let features;
                    if (layers) {
                        features = obj.queryRenderedFeatures(e.point, {
                            layers: isArray(layers) ? layers : [layers]
                        });
                    }
                    _func.call(self, e, obj, features);
                };

                if (!self.events[key]) {
                    self.events[key] = [];
                }

                self.events[key].push(func);

                if (obj.on) {
                    obj.on(key, func);
                } else {
                    obj.addEventListener(key, func);
                }
            })
        }
    }

    /**
     * 取消绑定事件
     * @param obj 需要取消绑定事件的对象
     * @return null;
     */
    unbindEvents(obj) {
        Object.entries(this.events).forEach(([key, funcArray]) => {
            funcArray.forEach((func) => {
                if (obj.off) {
                    obj.off(key, func);
                } else {
                    obj.removeEventListener(key, func);
                }
            });
            this.events[key] = null;
        })
    }

    /**
     * 给某个对象绑定需要切换的属性对应的方法
     * @param obj 需要绑定属性的对象
     * @param toggleMethods 属性和对应的2个切换方法
     * @return null;
     */
    bindToggleMethods(obj, toggleMethods) {
        Object.entries(toggleMethods).forEach(([key, method]) => {
            if (this.props[key] !== undefined) {
                if (this.props[key]) {
                    obj[method[0]]();
                } else {
                    obj[method[1]]();
                }
            }
        });
    }

    getOptions(options, props = this.props) {
        const result = {};
        options.forEach((key) => {
            if (props[key] !== undefined) {
                result[key] = props[key];
            }
        });
        return result;
    }

    render() {
        return null;
    }
}

export default BaseComponent;
