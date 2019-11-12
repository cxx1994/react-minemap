import React from 'react';
import Map from "../../components/map";

class Fly extends React.Component {
    fly1 = () => {
        this.mapRef.map.flyTo({
            center: [
                116.46 + (Math.random() - 0.5) * 0.1,
                39.92 + (Math.random() - 0.5) * 0.1]
        });
    };
    fly2 = () => {
        this.mapRef.map.flyTo({
            center: [
                116.46 + (Math.random() - 0.5) * 0.2,
                39.92 + (Math.random() - 0.5) * 0.2],
            zoom: 14,
            bearing: 10,
            pitch: 30,
            duration: 2000
        });
    };
    fly3 = () => {
        this.mapRef.map.easeTo({
            center: [
                116.46 + (Math.random() - 0.5) * 0.2,
                39.92 + (Math.random() - 0.5) * 0.2],
            zoom: 14,
            bearing: 0,
            pitch: 60,
            duration: 2000
        });
    };

    saveMapRef = ref => {
        this.mapRef = ref;
    };

    render() {


        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={16}
                pitch={60}
                ref={this.saveMapRef}
            >
                <div id="wrap">
                    <button onClick={this.fly1}>飞行示例1</button>
                    <button onClick={this.fly2}>飞行示例2</button>
                    <button onClick={this.fly3}>飞行示例3</button>
                </div>
            </Map>
        )
    }
}

export default Fly;
