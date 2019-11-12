import React from 'react';
import Map from '../../components/map';
import Marker from '../../components/marker';

const geojson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "message": "x停车场",
                "iconSize": [44, 44]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    116.46 + 0.99718 * 0.001, 39.92 + 0.33252 * 0.001
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "message": "xx停车场",
                "iconSize": [44, 44]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    116.46 + 0.48334 * 0.001, 39.92 + 0.42805 * 0.001
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "message": "xxx停车场",
                "iconSize": [44, 44]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    116.46 + 0.97309 * 0.01, 39.92 + 0.67836 * 0.01
                ]
            }
        }
    ]
};

class GeojsonMarker extends React.Component {
    state = {
        msg: '',
        deleteMarkerKeys: [],
    };

    setMsg = msg => {
        this.setState({
            msg,
        })
    };

    deleteMarker = index => {
        this.setState({
            deleteMarkerKeys: [...this.state.deleteMarkerKeys, index],
        })
    };

    render() {
        const { msg, deleteMarkerKeys } = this.state;

        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={14}
                style={{ height: "calc(100vh)" }}
            >
                <div className='distance-container'>{msg}</div>
                {
                    geojson.features.map((item, index) => !deleteMarkerKeys.includes(index) && (
                        <Marker
                            key={index}
                            position={item.geometry.coordinates}
                            className="marker-park"
                            offset={[-item.properties.iconSize[0] / 2, -item.properties.iconSize[1] / 2]}
                            events={{
                                mouseenter: () => this.setMsg(item.properties.message),
                                contextmenu: () => this.deleteMarker(index),
                            }}
                        />
                    ))
                }
            </Map>
        )
    }
}

export default GeojsonMarker;
