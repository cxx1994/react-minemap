import React from 'react';
import Map from '../../components/map';

class ZoomRestrict extends React.Component {
    render() {
        return (
            <Map
                container="ZoomRestrictMap"
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={16}
                pitch={60}
                maxZoom={16}
                minZoom={13}
            />
        )
    }
}

export default ZoomRestrict;
