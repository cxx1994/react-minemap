import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";

class GeojsonLine extends React.Component {
    state = {
        visible: true,
    };

    removeLayer = () => {
        this.setState({
            visible: false,
        })
    };

    addLayer = () => {
        this.setState({
            visible: true,
        })
    };

    render() {
        const source = {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [116.46 + 0.10269 * 0.01, 39.92 + 0.86826 * 0.01],
                        [116.46 + 0.95035 * 0.01, 39.92 + 0.42216 * 0.01],
                        [116.46 + 0.47082 * 0.01, 39.92 + 0.31452 * 0.01],
                        [116.46 + 0.30975 * 0.01, 39.92 + 0.84432 * 0.01],
                        [116.46 + 0.60765 * 0.01, 39.92 + 0.75360 * 0.01],
                        [116.46 + 0.25026 * 0.01, 39.92 + 0.69219 * 0.01]
                    ]
                }
            }
        };

        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={15}
                pitch={60}
            >
                <div id="wrap">
                    <button onClick={this.removeLayer}>删除线图层</button>
                    <button onClick={this.addLayer}>添加线图层</button>
                </div>
                {
                    this.state.visible && (
                        <Layer
                            id="lines"
                            type="line"
                            source={source}
                            layout={{
                                "line-join": "round",
                                "line-cap": "round"
                            }}
                            paint={{
                                "line-color": "#ff0000",
                                "line-width": 6
                            }}
                        />
                    )
                }
            </Map>
        )
    }
}

export default GeojsonLine;
