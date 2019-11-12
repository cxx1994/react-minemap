import React from 'react';
import Map from '../../components/map';

class BaseMap extends React.Component {
    render() {
        return (
            <Map
                container="baseMap"
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={10}
                pitch={0}
                maxZoom={17}
                minZoom={3}
                style={{ height: "calc(100vh)" }}
            />
        )
    }
}

export default BaseMap;
