import { isArray } from "../core/util";
import log from "../core/log";

/**
 * @alias module:react-minemap/mixin/LayerCursorable
 * @constructor
 */

function LayerCursorable() {
    this._cursorLayers = [];
    this.on('mousemove', this._layerCursorStart);
}

LayerCursorable.prototype = {

    constructor: LayerCursorable,

    _layerCursorStart: function (e) {
        if (!this._cursorLayers.length) {
            return;
        }

        let features = this.queryRenderedFeatures(e.point, { layers: this._cursorLayers.map(item => item.id) });

        let cursor = '';

        if (features.length) {
            cursor = this._cursorLayers.find(item => item.id === features[0].layer.id).cursor;
        }

        this.getCanvas().style.cursor = cursor;
    },


    /**
     * @description 添加图层id
     * @param {string} id The layer's id.
     * @param {string} cursor default, pointer...
     * @return {module:react-minemap/mixin/LayerCursorable}
     * @example: map.addCursorLayer('line')
     */
    addCursorLayer: function (id, cursor = 'pointer') {
        if (!this.getLayer(id)) {
            log('The layer has not add to map. id:' + id);
            return this;
        }
        if (!this._cursorLayers.find(item => item.id === id)) {
            this._cursorLayers.push({ id, cursor });
        }

        return this;
    },
    addCursorLayers: function (ids) {
        let self = this;

        if (isArray(ids)) {
            ids.forEach(function (id) {
                self.addCursorLayer(id);
            });
        }

        return this;
    },

    /**
     * @description 移除图层id
     * @param {string} id The layer's id.
     * @return {module:react-minemap/mixin/LayerCursorable}
     * @example: map.removeCursorLayer('line')
     */
    removeCursorLayer: function (id) {
        let index = this._cursorLayers.findIndex(item => item.id === id);

        if (index > -1) {
            this._cursorLayers.splice(index, 1);
        }

        return this;
    },
    removeCursorLayers: function (ids) {
        let self = this;

        if (isArray(ids)) {
            ids.forEach(function (id) {
                self.removeCursorLayer(id);
            });
        }

        return this;
    }
};

export default LayerCursorable;