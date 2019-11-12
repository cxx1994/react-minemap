import Component from "./component";
import { isEqual } from "../core/util";

// props
// enableDraw   true：可以绘制；false：禁用绘制
// mode         绘制类型
// value        绘制插件的内容
// onChange     绘制插件的值改变
// boxSelect
// touchEnabled
// displayControlsDefault
// showButtons

class Edit extends Component {
    toggleMethods = {
        enableDraw: ['enableDraw', 'disableDraw'],
    };

    options = [
        'boxSelect',
        'touchEnabled',
        'displayControlsDefault',
        'showButtons',
    ];

    componentDidMount() {
        this.initialize();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const currProps = this.props;
        const prevOptions = this.getOptions(this.options, prevProps);
        const currOptions = this.getOptions(this.options);

        if (!isEqual(prevOptions, currOptions)) {
            this.setOptions(currOptions);
        }

        if (prevProps.enableDraw !== currProps.enableDraw) {
            this.bindToggleMeghods(this.edit, this.toggleMethods);
        }

        if (prevProps.mode !== currProps.mode) {
            this.setMode(currProps.mode);
        }

        if (!isEqual(prevProps.value, currProps.value)) {
            this.setFeatures(currProps.value);
        }
    }

    componentWillUnmount() {
        this.destroy();
    }

    destroy() {
        if (this.edit) {
            this.edit.dispose();
        }
        this.unbindEvents(this.props.map);
    }

    initialize() {
        const { defaultValue, value, map, mode, events } = this.props;

        const edit = (this.edit = new window.minemap.edit.init(map, this.getOptions(this.options)));

        this.edit = edit;
        window.myEdit = edit;

        this.setFeatures(value || defaultValue);

        this.setMode(mode);

        this.bindToggleMethods(edit, this.toggleMethods);

        this.bindEvents(map, events);

        this.bindChangeEvents();
    }

    setOptions(options) {
        if (this.edit) {
            this.edit.setOptions(options);
        }
    }

    setFeatures(features) {
        if (this.edit && features) {
            this.edit.setFeatures(features);
        }
    }

    setMode(mode) {
        if (this.edit && mode) {
            this.edit.onBtnCtrlActive(mode);
        }
    }

    getValue() {
        return this.edit && this.edit.draw.getAll();
    }

    handleValueChange() {
        this.props.onChange && this.props.onChange(this.getValue());
    }

    bindChangeEvents() {
        this.bindEvent(this.props.map, {
            "draw.create": this.handleValueChange,
            "draw.update": this.handleValueChange,
            "draw.delete": this.handleValueChange
        });
    }

    trash() {
        if (this.edit) {
            this.edit.draw.trash();
        }
    }

    resetValue() {
        this.setFeatures({
            type: 'FeatureCollection',
            features: []
        });
        this.handleValueChange();
    }

    render() {
        return null;
    }

}

export default Edit;