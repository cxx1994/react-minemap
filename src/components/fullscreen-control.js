import Control from "./control";

class FullscreenControl extends Control {
  getControl() {
    return new window.minemap.Fullscreen();
  }
}

export default FullscreenControl;