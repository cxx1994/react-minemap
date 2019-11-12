import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";

class Raster extends React.Component {
    render() {
        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={6}
                pitch={0}
                style={{ height: "100%" }}
            >
                <Layer
                    id="hillshade"
                    type="raster"
                    source={{
                        "type": "raster",
                        "tileSize": 256,
                        "tiles": ["minemapdatao://hillshade/{z}/{x}/{y}"]
                    }}
                    minzoom={1}
                    maxzoom={17}
                    layout={{
                        "visibility": "visible"
                    }}
                />
            </Map>
        )
    }
}

export default Raster;
