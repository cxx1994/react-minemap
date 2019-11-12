import React from 'react';
import Map from '../../components/map';
import Marker from '../../components/marker';
import Popup from '../../components/popup';

class MarkerPopup extends React.Component {
    render() {
        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={15}
                pitch={0}
                style={{ height: "calc(100vh)" }}
            >
                <Marker
                    position={[116.46,39.92]}
                    className="marker-police"
                    offset={[-25, -25]}
                    popup={<Popup offset={[0, -30]} text={'这里是一个执勤人员'}/>}
                />
            </Map>
        )
    }
}

export default MarkerPopup;
