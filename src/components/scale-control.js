import Control from "./control";

class ScaleControl extends Control {
    getControl() {
        return new window.minemap.Scale();
    }
}

export default ScaleControl;