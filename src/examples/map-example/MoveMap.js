import React from 'react';
import Map from '../../components/map';

class MoveMap extends React.Component {

    moveMap = (VStep, HStep) => {
        this.mapRef.map.panBy([VStep, HStep]);
    };

    saveMapRef = ref => {
        this.mapRef = ref;
    };

    render() {
        const style = {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            backgroundColor: 'white',
        };

        return (
            <Map
                ref={this.saveMapRef}
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={16}
                pitch={60}
                style={{ height: "calc(100vh)" }}
            >
                <div style={style}>
                    <button onClick={() => this.moveMap(0, 50)}>上移</button>
                    <button onClick={() => this.moveMap(0, -50)}>下移</button>
                    <button onClick={() => this.moveMap(50, 0)}>左移</button>
                    <button onClick={() => this.moveMap(-50, 0)}>右移</button>
                </div>
            </Map>
        )
    }
}

export default MoveMap;
