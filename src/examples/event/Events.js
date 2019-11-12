import React from 'react';
import Map from "../../components/map";

class Events extends React.Component {
    handleMapClick = e => {
        alert("地图被点击了");
    };

    render() {


        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={16}
                pitch={60}
                events={{
                    click: this.handleMapClick
                }}
            />
        )
    }
}

export default Events;
