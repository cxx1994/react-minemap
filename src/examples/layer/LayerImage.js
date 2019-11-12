import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";

class LayerImage extends React.Component {
    render() {
        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={15}
                pitch={60}
                style={{ height: "100%" }}
            >
                <Layer
                    id="imageLayer"
                    type="raster"
                    source={{
                        "type": "image",
                        "url": "//minedata.cn/minemapapi/demo/images/radar.gif",
                        "coordinates": [
                            [116.46 - 0.01, 39.92 + 0.01],
                            [116.46+ 0.01, 39.92+ 0.01],
                            [116.46+ 0.01, 39.92- 0.01],
                            [116.46- 0.01, 39.92- 0.01]
                        ]
                    }}
                    minzoom={10}
                    maxzoom={17}
                    layout={{
                        "visibility": "visible"
                    }}
                    paint={{
                        "raster-opacity": 0.85
                    }}
                />
            </Map>
        )
    }
}

export default LayerImage;
