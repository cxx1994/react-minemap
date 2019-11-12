import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";

class LayerIconImage extends React.Component {
    render() {
        const source = {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [116.46 + 0.18490 * 0.01, 39.92 + 0.39091 * 0.01]
                    },
                    "properties": {
                        "title": "事件1",
                        "eventtype": "1000"
                    }
                }, {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [116.46 + 0.52841 * 0.01, 39.92 + 0.33256 * 0.01]
                    },
                    "properties": {
                        "title": "事件2",
                        "eventtype": "1001"
                    }
                }, {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [116.46 + 0.15914 * 0.01, 39.92 + 0.23059 * 0.01]
                    },
                    "properties": {
                        "title": "事件3",
                        "eventtype": "1002"
                    }
                }]
            }
        };

        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={14}
                pitch={0}
            >
                <Layer
                    id="points"
                    type="symbol"
                    source={source}
                    layout={{
                        "icon-image": "event-app-{eventtype}-18",
                        "text-field": "{title}",
                        "text-offset": [0, 0.6],
                        "text-anchor": "top",
                        "icon-allow-overlap": true,  //图标允许压盖
                        "text-allow-overlap": true,   //图标覆盖文字允许压盖
                    }}
                    paint={{
                        "text-color": '#333333'
                    }}
                />
            </Map>
        )
    }
}

export default LayerIconImage;
