import React from 'react';
import Map from '../../components/map';
import Marker from '../../components/marker';
import Popup from '../../components/popup';

class MarkerMap extends React.Component {
    render() {
        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={16}
                style={{ height: "calc(100vh)" }}
            >
                <Marker
                    position={[116.46, 39.92]}
                    className="marker-police"
                    offset={[-25, -25]}
                    popup={<Popup>这是marker的信息窗</Popup>}
                    events={{
                        click: e => console.log(e)
                    }}
                />
            </Map>
        )
    }
}

export default MarkerMap;
