const objToString = Object.prototype.toString;

/**
 * @alias module:react-minemap/core/util
 * @param {*} value
 * @return {boolean}
 */
export function isArray(value) {
    return objToString.call(value) === '[object Array]';
}

/**
 * @memberOf module:react-minemap/core/util
 * @param {*} value
 * @return {boolean}
 */
export function isFunction(value) {
    return typeof value === 'function';
}

/**
 * @memberOf module:react-minemap/core/util
 * @param {*} value
 * @return {boolean}
 */
export function isString(value) {
    return objToString.call(value) === '[object String]';
}

/**
 * @memberOf module:react-minemap/core/util
 * @param {*} value
 * @return {boolean}
 */
export function isObject(value) {
    let type = typeof value;
    return type === 'function' || (!!value && type === 'object');
}

/**
 * @param {*} source
 * @return {*} new
 */
export function clone(source) {
    if (source == null || typeof source !== 'object') {
        return source;
    }

    let result = {};

    if (isArray(source)) {
        result = [];
        for (let i = 0, len = source.length; i < len; i++) {
            result[i] = clone(source[i]);
        }
    } else {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                result[key] = clone(source[key]);
            }
        }
    }

    return result;
}

/**
 * @memberOf module:react-minemap/core/util
 * @param {*} target
 * @param {*} source
 * @param {boolean} [overlay=false]
 */
export function defaults(target, source, overlay) {
    for (var key in source) {
        if (source.hasOwnProperty(key)
            && (overlay ? source[key] != null : target[key] == null)
        ) {
            target[key] = source[key];
        }
    }
    return target;
}

/**
 * @memberOf module:react-minemap/core/util
 * @param {Object|Function} target
 * @param {Object|Function} source
 * @param {boolean} overlay
 */
export function mixin(target, source, overlay) {
    target = 'prototype' in target ? target.prototype : target;
    source = 'prototype' in source ? source.prototype : source;

    defaults(target, source, overlay);
}

/**
 * @description 添加source
 * @param {Object} map minemap实例
 * @param {String} id source的id
 * @param {Object} source source的值
 */
export function addSource(map, id, source) {
    let _source = map.getSource(id);
    if (_source) {
        _source.setData(source.data);
    } else {
        map.addSource(id, source);
    }
}

/**
 * @description 更新source
 * @param {Object} map minemap实例
 * @param {String} id source的id
 * @param {Object} source source的值
 */
export function updateSource(map, id, source) {
    addSource(map, id, source);
}

/**
 * @description 移除source
 * @param {Object} map minemap实例
 * @param {String|Array} id source的id
 */
export function removeSources(map, id) {
    if (!map.style) {
        return;
    }
    if (isArray(id)) {
        return id.forEach(i => removeSources(map, i));
    }

    if (id && map.getSource(id)) {
        map.removeSource(id);
    }
}

/**
 * @description 移除layer
 * @param {Object} map minemap实例
 * @param {String|Array} id layer的id
 */
export function removeLayers(map, id) {
    if (!map.style) {
        return;
    }
    if (isArray(id)) {
        return id.forEach(i => removeLayers(map, i));
    }

    if (id && map.getLayer(id)) {
        map.removeLayer(id);
    }
}

/**
 * @description 处理了JSON.stringify处理循环引用对象报错问题
 * @param {*} params 转字符串的参数
 * @return {String}
 */
export function stringify(params) {
    let cache = [];

    let str = JSON.stringify(params, function (key, value) {
        if (isObject(value)) {
            if (cache.indexOf(value) !== -1) {
                return;
            }
            cache.push(value);
        }
        return value;
    });

    cache = null;

    return str;
}

/**
 * @description 判断两个参数是否相等
 * @param {*} a 第一个参数
 * @param {*} b 第二个参数
 * @return {Boolean}
 */
export function isEqual(a, b) {
    return stringify(a) === stringify(b);
}