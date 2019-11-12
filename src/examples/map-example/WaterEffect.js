import React from 'react';
import Map from '../../components/map';

class WaterEffect extends React.Component {
    saveMapRef = ref => {
        this.mapRef = ref;
    };

    layerWaterToggle = (type) => {
        const map = this.mapRef.map;
        map.setPaintProperty('1570f902b53f40e586867e47db26f36b', 'fill-water', type);
        map.setPaintProperty('475b1981035042c1a3052f803569803f', 'fill-water', type);
        map.setPaintProperty('9eb4ff9042904e62a40438e96672d569', 'fill-water', type);
        map.setPaintProperty('289309a40e374533944617947c765876', 'fill-water', type);
        map.setPaintProperty('5e5bc87a3c64477993bddda3be1337d5', 'fill-water', type);
    };

    render() {
        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={16}
                pitch={60}
                ref={this.saveMapRef}
                events={{
                    load: () => this.layerWaterToggle('water')
                }}
            >
                <div id="wrap">
                    <button onClick={() => this.layerWaterToggle('water')}>开启水纹特效</button>
                    <button onClick={() => this.layerWaterToggle('none')}>关闭水纹特效</button>
                </div>
            </Map>
        )
    }
}

export default WaterEffect;
