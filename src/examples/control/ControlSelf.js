import React from 'react';
import Map from "../../components/map";
import CustomControl from "../../components/custom-control";

class ControlSelf extends React.Component {
    render() {
        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                style={{ height: "100%" }}
                center={[116.46, 39.92]}
                zoom={11}
                pitch={0}
                logoControl={false}
            >
                <CustomControl position="top-right" className="custom-ctrl-container">
                    <div className="custom-ctrl" style={{ fontSize: 20 }}>Hello, world</div>
                </CustomControl>
            </Map>
        )
    }
}

export default ControlSelf;
