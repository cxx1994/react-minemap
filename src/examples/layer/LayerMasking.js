import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";

class LayerMasking extends React.Component {
    state = {
        color: '#330033',
        opacity: 0.7,
    };

    changeColor = (e) => {
        this.setState({
            color: e.target.value
        })
    };

    changeOpacity = (e) => {
        this.setState({
            opacity: Number(e.target.value)
        })
    };

    render() {
        const { color, opacity } = this.state;

        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={16}
                pitch={60}
            >
                <div id="wrap">
                    <label>改变蒙版颜色</label>
                    <input value={color} id="color" type="color" onChange={this.changeColor} />
                    <label>改变蒙版透明度</label>
                    <input value={opacity} onChange={this.changeOpacity} id="range" type="range" max="1.0" min="0.0" step="0.1" />
                </div>
                <Layer
                    id="mask"
                    type="background"
                    paint={{
                        'background-color': color,
                        'background-opacity': opacity
                    }}
                />
            </Map>
        )
    }
}

export default LayerMasking;
