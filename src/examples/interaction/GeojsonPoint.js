import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";

class GeojsonPoint extends React.Component {
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
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [116.46 + 0.69566 * 0.01, 39.92 + 0.75997 * 0.01]
                    },
                    "properties": {
                        "title": "大学",
                        "icon": "marker-15-6",
                        "color": "#ff0000"
                    }
                }, {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [116.46 + 0.65688 * 0.01, 39.92 + 0.49429 * 0.01]
                    },
                    "properties": {
                        "title": "初中",
                        "icon": "marker-15-6",
                        "color": "#00ff00"
                    }
                }, {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [116.46 + 0.77287 * 0.01, 39.92 + 0.13490 * 0.01]
                    },
                    "properties": {
                        "title": "医院",
                        "icon": "marker-15-6",
                        "color": "#0000ff"
                    }
                }]
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
                    <button onClick={this.removeLayer}>删除点图层</button>
                    <button onClick={this.addLayer}>添加点图层</button>
                </div>
                {
                    this.state.visible && (
                        <Layer
                            id="points"
                            type="symbol"
                            source={source}
                            layout={{
                                "icon-image": "{icon}",
                                "text-field": "{title}",
                                "text-offset": [0, 0.6],
                                "text-anchor": "top",
                                "icon-allow-overlap": true,  //图标允许压盖
                                "text-allow-overlap": true,   //图标覆盖文字允许压盖
                            }}
                            paint={{
                                "text-color": {
                                    'type': 'identity',
                                    'property': 'color'
                                },
                                "icon-color": {
                                    'type': 'identity',
                                    'property': 'color'
                                }
                            }}
                        />
                    )
                }
            </Map>
        )
    }
}

export default GeojsonPoint;
