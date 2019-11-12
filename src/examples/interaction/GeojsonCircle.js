import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";
import Popup from "../../components/popup";

class GeojsonCircle extends React.Component {
    state = {
        feature: null,
    };

    handleLayerMousemove = (e, map, features) => {
        this.setState({
            feature: features.length ? features[0] : null,
        })
    };

    render() {
        const feature = this.state.feature;
        const source = {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [116.46 + 0.34259 * 0.01, 39.92 + 0.38108 * 0.01]
                        },
                        "properties": {
                            "title": "大学",
                            "icon": "school",
                            "radius": 500
                        },
                    }, {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [116.46 + 0.77305 * 0.01, 39.92 + 0.06973 * 0.01]
                        },
                        "properties": {
                            "title": "医院",
                            "icon": "hospital",
                            "radius": 500
                        }
                    }
                ]
            }
        };

        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={14}
                minZoom={3}
                maxZoom={17}
                pitch={0}
            >
                <Layer
                    id="points"
                    type="circle"
                    source={source}
                    paint={{
                        'circle-radius': {
                            'base': 1.5,
                            'stops': [[5, 8], [18, 80]]
                        },

                        'circle-color': "#00ff00",      //填充圆形的颜色
                        'circle-blur': 0.1,              //模糊程度，默认0
                        'circle-opacity': 1,             //透明度，默认为1
                    }}
                    maxzoom={18}
                    filter={['in', '$type', 'Point']}
                    events={{
                        mousemove: this.handleLayerMousemove
                    }}
                />
                {
                    feature && (
                        <Popup
                            closeButton={false}
                            closeOnClick={false}
                            position={feature.geometry.coordinates}
                        >
                            <span>{feature.properties.title + "经纬度为：" + feature.geometry.coordinates}</span>
                        </Popup>
                    )
                }
            </Map>
        )
    }
}

export default GeojsonCircle;
