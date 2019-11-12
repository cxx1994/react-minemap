import React from 'react';
import Map from "../../components/map";

class PointsDistance extends React.Component {
    compute = () => {
        let from = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [116.46 + 0.85502, 39.92 + 0.77745]
            }
        };
        let to = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [116.46 + 0.65834, 39.92 + 0.76338]
            }
        };
        let options = { units: 'kilometers' };

        // let points = {
        //     "type": "FeatureCollection",
        //     "features": [from, to]
        // };

        let distance = window.turf.distance(from, to, options);
        alert('两点之间的距离是：' + distance + '千米');

        return false;
    };

    render() {
        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={16}
                pitch={0}
                events={{
                    load: this.compute
                }}
            />
        )
    }
}

export default PointsDistance;
