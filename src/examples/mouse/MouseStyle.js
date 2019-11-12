import React from 'react';
import Map from "../../components/map";

class MouseStyle extends React.Component {
    state = {
        cursor: '',
    };

    cursorMap = [
        { name: '默认模式', value: '' },
        { name: '普通模式', value: 'default' },
        { name: '编辑模式', value: 'crosshair' },
        { name: '移动模式', value: 'move' },
        { name: '点击模式', value: 'pointer' },
        { name: '图标模式', value: 'url("http://minedata.cn/minemapapi/demo/images/cursor_measure.cur"),default' },
    ];

    handleCursorChange = (cursor) => () => {
        this.setState({
            cursor
        })
    };

    render() {


        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={16}
                pitch={60}
                cursor={this.state.cursor}
            >
                <div id="wrap">
                    {
                        this.cursorMap.map(({ name, value }, index) => (
                            <button key={index} onClick={this.handleCursorChange(value)}>{name}</button>
                        ))
                    }
                </div>
            </Map>
        )
    }
}

export default MouseStyle;
