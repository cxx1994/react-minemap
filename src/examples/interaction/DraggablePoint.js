import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";

class DraggablePoint extends React.Component {

    render() {
        const source = {
            'type': 'geojson',
            'data': {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [116.46, 39.92]
                        },
                        "properties": {
                            "id": 1,
                            "radius": 20,
                            "color": "#40c0f5"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [116.46 + 0.01, 39.92 + 0.01]
                        },
                        "properties": {
                            "id": 2,
                            "radius": 20,
                            "color": "#fdeccd"
                        }
                    }
                ]
            }
        };

        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={12}
            >
                <Layer
                    draggable={true}
                    cursor="move"
                    id="point-layer"
                    type="circle"
                    source={source}
                    paint={{
                        "circle-radius": {
                            'type': 'identity',
                            'property': 'radius'
                        },
                        "circle-color": {
                            'type': 'identity',
                            'property': 'color'
                        }
                    }}
                    emphasis={{
                        'radius': 20,
                        'color': '#ff00ff'
                    }}
                />
            </Map>
        )
    }
}

export default DraggablePoint;
