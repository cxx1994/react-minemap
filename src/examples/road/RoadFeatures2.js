import React from 'react';
import Map from "../../components/map";
import Layer from '../../components/layer';

const mapStyleUrl = "http://minedata.cn/service/solu/style/id/2365";

class RoadFeatures2 extends React.Component {
    state = {
        features: [],
    };

    roadLayerIds = [];

    componentDidMount() {
        this.init();
    }

    init = () => {
        window.minemap.util.getJSON(mapStyleUrl, (error, data) => {
            data.layers.forEach((layer) => {
                //判断是否道路线图层
                if (
                    layer.type === 'line'
                    && (layer.source === 'Merge_1' || layer.source === 'Road')
                    && layer['source-layer'] === 'Road'
                ) {
                    this.roadLayerIds.push(layer.id);
                    // 添加hover效果
                    this.mapRef.map.addCursorLayer(layer.id);
                }
            });
        })
    };

    handleMapClick = (e, map) => {
        let center = map.unproject(e.point);
        let radius = 100;
        let boundArray = new window.minemap.LngLat(center.lng, center.lat).toBounds(radius).toArray();
        let bound1 = map.project(boundArray[0]);
        let bound2 = map.project(boundArray[1]);
        let bounds = [[Math.floor(Math.min(bound1.x, bound2.x)), Math.floor(Math.min(bound1.y, bound2.y))], [Math.floor(Math.max(bound1.x, bound2.x)), Math.floor(Math.max(bound1.y, bound2.y))]];
        let features = map.queryRenderedFeatures(bounds, {layers: this.roadLayerIds});

        this.setState({
           features:  features.length < 1 ? [] : features
        });
    };

    saveMapRef = (ref) => {
        this.mapRef = ref;
    };

    render() {
        const { features } = this.state;

        const source = {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": features
            }
        };

        return (
            <Map
                styleUrl={mapStyleUrl}
                center={[116.46, 39.92]}
                zoom={15}
                pitch={0}
                maxZoom={17}
                minZoom={8}
                ref={this.saveMapRef}
                events={{
                    click: this.handleMapClick
                }}
            >
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
                        "line-width": 3
                    }}
                />
            </Map>
        )
    }
}

export default RoadFeatures2;
