import React from 'react';
import Map from "../components/map";
import FullscreenControl from "../components/fullscreen-control";
import ScaleControl from "../components/scale-control";
import NavigationControl from "../components/navigation-control";
import CustomControl from "../components/custom-control";

class MapControl extends React.Component {
    render() {
        return (
            <Map
                container="testMapControl"
                center={[116.46, 39.92]}
            >
                <FullscreenControl position="top-right"/>
                <ScaleControl position="top-left"/>
                <NavigationControl position="bottom-right"/>
                <CustomControl position="bottom-left" className="custom-ctrl-container">
                    <div className="custom-ctrl">自定义控件</div>
                </CustomControl>
            </Map>
        )
    }
}

export default MapControl;
