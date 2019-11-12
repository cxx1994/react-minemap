import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";

class LayerVideo extends React.Component {
    render() {
        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={14}
                pitch={60}
                style={{ height: "100%" }}
            >
                <Layer
                    id="videoLayer"
                    type="raster"
                    source={{
                        "type": "video",
                        "urls": ["http://minedata.cn/minemapapi/demo/assets/drone.mp4"],
                        "coordinates": [
                            [116.46 - 0.01, 39.92 + 0.01],
                            [116.46 + 0.01, 39.92 + 0.01],
                            [116.46 + 0.01, 39.92 - 0.01],
                            [116.46 - 0.01, 39.92 - 0.01]
                        ]
                    }}
                    minzoom={1}
                    maxzoom={17}
                />
            </Map>
        )
    }
}

export default LayerVideo;
