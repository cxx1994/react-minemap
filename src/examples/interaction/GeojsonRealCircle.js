import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";

class GeojsonRealCircle extends React.Component {
    getSource() {
        let center = [116.46,39.92];
        let radius = 5;
        let options = {steps: 64, units: 'kilometers', properties: {foo: 'bar'}};
        let circleGeo = window.turf.circle(center, radius, options);

        return {
            "type": "geojson",
            "data": circleGeo
        };
    }

    render() {
        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={11}
                pitch={0}
            >
                <Layer
                    id="polygon"
                    type="fill"
                    source={this.getSource()}
                    paint={{
                        "fill-color": "blue",
                        "fill-opacity": 0.6
                    }}
                />
            </Map>
        )
    }
}

export default GeojsonRealCircle;
