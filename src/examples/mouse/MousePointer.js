import React from 'react';
import Map from "../../components/map";

class MouseStyle extends React.Component {
    state = {
        info: '',
    };

    handleMapClick = e => {
        const { lngLat, point } = e;
        const info = "经纬度坐标：" + lngLat.toArray() + "  像素点坐标：x-" + point.x + ",y-" + point.y;
        this.setState({
            info,
        })
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
            >
                <div id="wrap">{this.state.info}</div>
            </Map>
        )
    }
}

export default MouseStyle;
