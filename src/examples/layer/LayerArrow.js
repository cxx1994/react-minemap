import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";

class LayerArrow extends React.Component {
    render() {
        const source = {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [116.46 + 0.89966 * 0.01, 39.92 + 0.73117 * 0.01],
                        [116.46 + 0.94345 * 0.01, 39.92 + 0.22072 * 0.01],
                        [116.46 + 0.67907 * 0.01, 39.92 + 0.88998 * 0.01],
                        [116.46 + 0.33830 * 0.01, 39.92 + 0.97416 * 0.01],
                        [116.46 + 0.48103 * 0.01, 39.92 + 0.65475 * 0.01],
                        [116.46 + 0.87627 * 0.01, 39.92 + 0.43547 * 0.01]
                    ]
                }
            }
        };

        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46,39.92]}
                zoom={14}
                pitch={0}
                bearing={90}
                minzoom={9}
                maxzoom={17}
            >
                <Layer
                    id="line"
                    type="line"
                    source={source}
                    paint={{
                        "line-color": "#40c0f5",
                        "line-width": 4
                    }}
                />
                <Layer
                    id="points"
                    type="symbol"
                    source="line"
                    layout={{
                        "symbol-placement": "line",
                        "icon-allow-overlap": true,
                        "icon-image": "direction-1-18",       //指定箭头图标
                        "text-field": "{title}",
                        "text-offset": [0, 0.6],
                        "text-anchor": "top"
                    }}
                    paint={{
                        "icon-color": "#ff0000"
                    }}
                />
            </Map>
        )
    }
}

export default LayerArrow;
