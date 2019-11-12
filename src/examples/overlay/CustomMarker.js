import React from 'react';
import Map from '../../components/map';
import Marker from '../../components/marker';

class CustomMarker extends React.Component {
    state = {
        markerVisible: true,
    };

    deleteMarker = () => {
        this.setState({
            markerVisible: false,
        })
    };

    render() {
        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                style={{ height: "calc(100vh)" }}
                center={[116.46, 39.92]}
                zoom={15}
                pitch={60}
            >
                <Marker
                    position={[116.46 + 0.001, 39.92 + 0.001]}
                    offset={[-25, -25]}
                >
                    <div className="marker-police">示例一</div>
                </Marker>
                {
                    this.state.markerVisible && (
                        <Marker
                            position={[116.46, 39.92 + 0.003]}
                            offset={[-25, -25]}
                        >
                            <div
                                className="test-marker"
                                style={{ border: '1px solid rgb(170, 170, 170)', backgroundColor: 'white' }}
                            >
                                <span>自定义marker示例2&nbsp;&nbsp;</span>
                                <span
                                    title="删除该点"
                                    style={{ color: 'red', cursor: 'pointer' }}
                                    onClick={this.deleteMarker}
                                >&nbsp;x&nbsp;</span>
                            </div>
                        </Marker>
                    )
                }
            </Map>
        )
    }
}

export default CustomMarker;
