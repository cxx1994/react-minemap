import React from 'react';
import Map from '../../components/map';
import Marker from '../../components/marker';

class SpreadMarker extends React.Component {
    render() {
        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={15}
                pitch={60}
                style={{ height: "calc(100vh)" }}
            >
                <Marker
                    position={[116.46, 39.92]}
                    offset={[-40, -40]}
                >
                    <div style={{ zIndex: 120 }}>
                        <div className="ring-point-marker">
                            <div className="ring-point-inner1" />
                            <div className="ring-point-inner2" />
                            <div className="ring-point-inner3" />
                        </div>
                    </div>
                </Marker>
            </Map>
        )
    }
}

export default SpreadMarker;
