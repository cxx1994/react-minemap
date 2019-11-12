import React from "react";

class Control extends React.Component {
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
        if (this.control) {
            this.props.map.removeControl(this.control);
            this.control = null;
        }
    }

    initialize() {
        let map = this.props.map;
        if (!map) {
            return;
        }

        this.destroy();
        this.control = this.getControl();
        map.addControl(this.control, this.props.position);

    }

    getControl() {
        return null;
    }

    render() {
        return null;
    }
}

export default Control;