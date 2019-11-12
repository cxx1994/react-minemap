import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";

class GeojsonPolygon extends React.Component {
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
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [[
                        [116.46 + 0.001, 39.92 + 0.001],
                        [116.46 + 0.005, 39.92 + 0.001],
                        [116.46 + 0.005, 39.92 + 0.005],
                        [116.46 + 0.001, 39.92 + 0.005],
                        [116.46 + 0.001, 39.92 + 0.001]
                    ]]
                },
                "properties": {
                    "title": "多边形名称",
                    "icon": "school"
                }
            }
        };

        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={15}
                pitch={0}
            >
                <div id="wrap">
                    <button onClick={this.removeLayer}>删除线图层</button>
                    <button onClick={this.addLayer}>添加线图层</button>
                </div>
                {
                    this.state.visible && (
                        <Layer
                            id="polygon"
                            type="fill"
                            source={source}
                            layout={{}}
                            paint={{
                                'fill-color': '#f18',
                                'fill-opacity': 0.8
                            }}
                        />
                    )
                }
                {
                    this.state.visible && (
                        <Layer
                            id="points"
                            type="symbol"
                            source="polygon"
                            layout={{
                                "icon-image": "{icon}-15",
                                "text-field": "{title}",
                                "text-offset": [0, 0.6],
                                "text-anchor": "top"
                            }}
                            paint={{
                                "icon-color": "#0000ff"
                            }}
                        />
                    )
                }
            </Map>
        )
    }
}

export default GeojsonPolygon;
