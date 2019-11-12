import Control from "./control";

class NavigationControl extends Control {
  getControl() {
    return new window.minemap.Navigation();
  }
}

export default NavigationControl;