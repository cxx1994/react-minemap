import Component from "./component";
import { render, unmountComponentAtNode } from "react-dom";

/**
 * 信息窗
 * @link http://minedata.cn/api/static/doc/js/v2.0.0/base/classes/Popup.html;
 */
class Popup extends Component {
    options = [
        'closeButton',
        'closeOnClick',
        'className',
        'offset',
        'anchor',
        'autoPan',
        'maxHeight',
        'maxWidth',
        'minWidth',
    ];

    componentDidMount() {
        this.initialize();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.initialize();
    }

    componentWillUnmount() {
        this.destroy();
    }

    destroy() {
        if (this.popup) {
            this.popup.remove();
            this.popup = null;
        }
        if (this.contentDom) {
            unmountComponentAtNode(this.contentDom);
        }
    }

    initialize() {
        this.destroy();

        this.popup = new window.minemap.Popup(this.getOptions(this.options));

        if (this.props.position) {
            this.popup.setLngLat(this.props.position);
        }

        if (this.props.text) {
            this.popup.setText(this.props.text);
        } else {
            this.contentDom = document.createElement('div');
            render(this.props.children, this.contentDom);
            this.popup.setDOMContent(this.contentDom);
        }

        if (this.props.marker) {
            this.props.marker.setPopup(this.popup);
        } else if (this.props.map) {
            this.popup.addTo(this.props.map);
        }
    }

    render() {
        return null;
    }
}

export default Popup;