import React from "react";
import Component from "./component";
import { render, unmountComponentAtNode } from "react-dom";

/**
 * 地图标记
 * @link http://minedata.cn/api/static/doc/js/v2.0.0/base/classes/Marker.html;
 */
class Marker extends Component {
    options = [
        'offset',
    ];

    toggleMethods = {
        draggable: ['enableDragging', 'disableDragging'],
    };

    componentDidUpdate() {
        this.initialize();
    }

    componentDidMount() {
        this.initialize();
    }

    componentWillUnmount() {
        this.destroy();
    }

    destroy() {
        if (this.marker) {
            unmountComponentAtNode(this.contentDom);
            this.unbindEvents(this.contentDom);
            this.contentDom = null;
            this.props.map.removeMarker(this.marker);
            this.marker = null;
            this.destroyPopup();
        }
    }

    initialize() {
        const map = this.props.map;

        this.destroy();

        this.contentDom = document.createElement('div');
        this.contentDom.className = this.props.className;
        render(this.props.children, this.contentDom);

        this.marker = new window.minemap.Marker(this.contentDom, this.getOptions(this.options));

        if (this.props.position) {
            this.marker.setLngLat(this.props.position);
        }

        this.initializePopup();

        this.marker.addTo(map);

        this.bindEvents(this.contentDom, this.props.events);

        this.bindToggleMethods(this.marker, this.toggleMethods);
    }

    initializePopup() {
        if (this.props.popup) {
            const popupElement = React.cloneElement(this.props.popup, {
                marker: this.marker
            });

            this.popupDom = document.createElement('div');

            render(popupElement, this.popupDom);
        }
    }

    destroyPopup() {
        if (this.popupDom) {
            unmountComponentAtNode(this.popupDom);
        }
    }

    render() {
        return null;
    }
}

export default Marker;