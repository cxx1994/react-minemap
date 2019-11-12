import Control from "./control";
import { render, unmountComponentAtNode } from "react-dom";

class CustomControl extends Control {
    getControl() {
        const { children, className = "" } = this.props;

        function Control() {}

        Control.prototype.onAdd = function (map) {
            this._map = map;
            this._container = document.createElement('div');
            this._container.className = className;
            render(children, this._container);
            return this._container;
        };

        Control.prototype.onRemove = function () {
            unmountComponentAtNode(this._container);
            this._container.parentNode.removeChild(this._container);
            this._map = undefined;
        };

        return new Control();
    }
}

export default CustomControl;