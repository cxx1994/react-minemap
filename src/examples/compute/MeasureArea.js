import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";

class MeasureArea extends React.Component {
    state = {
        value: 0
    };

    handlePolygonMousemove = (e, map, features) => {
        if (!features.length) {
            this.setState({
                value: 0
            });
            return;
        }
        let fc = {
            type: 'FeatureCollection',
            features: features
        };

        //计算面积，传入参数可以是FeatureCollection对象、Feature对象、Geometry对象
        let area = window.turf.area(fc);
        // restrict to area to 2 decimal points
        let rounded_area = Math.round(area * 100) / 100;

        this.setState({
            value: rounded_area
        });
    };

    render() {
        const source = {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [[
                        [116.46+0.001, 39.92+ 0.001],
                        [116.46+ 0.85559*0.01, 39.92+ 0.77848*0.01],
                        [116.46+ 0.37827*0.01, 39.92+ 0.86821*0.01],
                        [116.46+0.001, 39.92+ 0.001]
                    ]]
                },
                "properties": {
                    "title": "多边形名称",
                    "icon": "school"
                }
            }
        };

        const { value } = this.state;

        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={15}
                pitch={60}
            >
                <div id='areaContainer' className='area-container'>
                    <div>多边形面积</div>
                    <div>{value ? <p><strong>{value}</strong>平方米</p> : <p>{value}</p>}</div>
                </div>
                <Layer
                    id="polygon"
                    source={source}
                    type="fill"
                    paint={{
                        'fill-color': '#f18',
                        'fill-opacity': 0.8
                    }}
                    events={{
                        mousemove: this.handlePolygonMousemove
                    }}
                />
                <Layer
                    id="points"
                    source="polygon"
                    type="symbol"
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
            </Map>
        )
    }
}

export default MeasureArea;
