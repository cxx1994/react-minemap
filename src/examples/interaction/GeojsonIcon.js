import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";

class LayerArrow extends React.Component {
    render() {
        const source = {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [116.46, 39.92]
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
                <Layer
                    icons={{
                        'park': 'http://minedata.cn/minemapapi/demo/images/park.png'
                    }}
                    id="points"
                    type="symbol"
                    source={source}
                    layout={{
                        "icon-image": "park",
                        "icon-size": 1
                    }}
                />
            </Map>
        )
    }
}

export default LayerArrow;
