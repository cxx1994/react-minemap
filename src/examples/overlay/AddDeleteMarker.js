import React from 'react';
import Map from '../../components/map';
import Marker from '../../components/marker';

class AddDeleteMarker extends React.Component {
    state = {
        markers: [],
    };

    addMarker = (e) => {
        const { markers } = this.state;
        markers.push(e.lngLat);
        this.setState({
            markers,
        })
    };

    delMarker = index => {
        const { markers } = this.state;
        markers.splice(index, 1);
        this.setState({
            markers,
        })
    };

    render() {
        const { markers } = this.state;

        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={15}
                pitch={0}
                style={{ height: "calc(100vh)" }}
                events={{
                    click: this.addMarker
                }}
            >
                {
                    markers.map((item, index) => (
                        <Marker
                            key={index}
                            position={item}
                            className="marker-police"
                            offset={[-25, -25]}
                            events={{
                                contextmenu: () => this.delMarker(index)
                            }}
                        />
                    ))
                }
            </Map>
        )
    }
}

export default AddDeleteMarker;
