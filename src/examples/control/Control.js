import React from 'react';
import Map from "../../components/map";
import FullscreenControl from "../../components/fullscreen-control";
import ScaleControl from "../../components/scale-control";
import NavigationControl from "../../components/navigation-control";

class MapControl extends React.Component {
    render() {
        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={11}
                pitch={0}
                logoControl={true}
                style={{ height: "100%" }}
            >
                <FullscreenControl position="top-right"/>
                <ScaleControl position="top-left"/>
                <NavigationControl position="bottom-right"/>
            </Map>
        )
    }
}

export default MapControl;
