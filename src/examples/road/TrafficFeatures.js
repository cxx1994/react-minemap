import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";
import Popup from '../../components/popup';

const mapStyleUrl = "http://minedata.cn/service/solu/style/id/2365";

class TrafficFeatures extends React.Component {
    state = {
        feature: {},
        lngLat: null,
    };

    trafficLayerIds = ['Traffic'];

    componentDidMount() {
        this.init();
    }

    init = () => {
        window.minemap.util.getJSON(mapStyleUrl, (error, data) => {
            data.layers.forEach((layer) => {
                //判断是否道路线图层
                if (layer.type === 'line' && layer.source === 'Traffic' && layer['source-layer'] === 'Trafficrtic') {
                    this.trafficLayerIds.push(layer.id);
                    this.mapRef.map.addCursorLayer(layer.id);
                }
            });
        })
    };

    handleMapClick = (e, map) => {
        let features = map.queryRenderedFeatures(e.point, { layers: this.trafficLayerIds });

        if (features.length < 1) {
            this.setState({
                feature: {},
                lngLat: null,
            });
            return;
        }

        this.setState({
            feature: features[0],
            lngLat: e.lngLat,
        });
    };

    saveMapRef = ref => {
        this.mapRef = ref;
    };

    render() {
        const { lngLat, feature } = this.state;
        const { properties } = feature;

        return (
            <Map
                styleUrl={mapStyleUrl}
                center={[116.46, 39.92]}
                zoom={16}
                pitch={60}
                maxZoom={17}
                minZoom={6}
                ref={this.saveMapRef}
                events={{
                    click: this.handleMapClick
                }}
            >
                <Layer
                    id="Traffic"
                    type="line"
                    source={{
                        "type": "vector",
                        "traffic": true,
                        "tiles": ["minemapdatad://Trafficrtic/{z}/{x}/{y}"]
                    }}
                    source-layer="Trafficrtic"
                    layout={{
                        "line-join": "round",
                        "line-cap": "round"
                    }}
                    paint={{
                        "line-color": {
                            "property": "status",
                            "stops": [
                                [0, '#999999'],
                                [1, '#66cc00'],
                                [2, '#ff9900'],
                                [3, '#cc0000'],
                                [4, '#9d0404']
                            ]
                        },
                        "line-width": {
                            "stops": [[5, 1], [18, 3]], "base": 1.2
                        }
                    }}
                />
                {
                    lngLat && properties && (
                        <Popup
                            closeButton={false}
                            closeOnClick={false}
                            position={lngLat}
                        >
                            <div>
                                <div>LINK Id：{properties.pid}</div>
                                <div>功能等级：{properties.function_class}</div>
                                <div>道路种别：{properties.kind}</div>
                                <div>路况状态：{properties.status}</div>
                            </div>
                        </Popup>
                    )
                }
            </Map>
        )
    }
}

export default TrafficFeatures;
