import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";

class LayerHide extends React.Component {
    state = {
        visible: true,
    };

    showLayer = () => {
        this.setState({
            visible: true
        })
    };

    hideLayer = () => {
        this.setState({
            visible: false
        })
    };

    render() {
        const { visible } = this.state;
        const source = {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [116.46 + 0.01248 * 0.01, 39.92 + 0.51849 * 0.01]
                    },
                    "properties": {
                        "title": "大学",
                        "icon": "school"
                    }
                }, {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [116.46 + 0.84838 * 0.01, 39.92 + 0.78518 * 0.01]
                    },
                    "properties": {
                        "title": "医院",
                        "icon": "hospital"
                    }
                }]
            }
        };

        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={16}
                pitch={60}
            >
                <div id="wrap">
                    <button onClick={this.hideLayer}>隐藏图层</button>
                    <button onClick={this.showLayer}>显示图层</button>
                </div>
                <Layer
                    id="points"
                    type="symbol"
                    source={source}
                    layout={{
                        "icon-image": "{icon}-15",
                        "text-field": "{title}",
                        "text-offset": [0, 0.6],
                        "text-anchor": "top",
                        "visibility": visible ? "visible" : "none"
                    }}
                    paint={{
                        "icon-color": "#0000ff"
                    }}
                />
            </Map>
        )
    }
}

export default LayerHide;
