import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";

class PointCluster extends React.Component {
    render() {
        const source = {
            type: "geojson",
            data: "http://minedata.cn/minemapapi/demo/assets/poi_suzhou.json",
            cluster: true,
            clusterMaxZoom: 15,
            clusterRadius: 50,
            enableQueryChildren: false
        };

        //添加聚合图层
        const layers = [[1000, '#f28cb1'], [100, '#f1f075'], [0, '#51bbd6']];

        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[121.90154, 29.46968]}
                zoom={13}
                pitch={0}
            >
                <Layer
                    id="unclustered-points"
                    type="symbol"
                    source={source}
                    filter={["!has", "point_count"]}
                    layout={{
                        "icon-image": "bank-15"
                    }}
                />
                {
                    layers.map((layer, i) => (
                        <Layer
                            key={i}
                            id={"cluster-" + i}
                            type="circle"
                            source={"unclustered-points"}
                            filter={
                                i === 0
                                    ? [">=", "point_count", layer[0]]
                                    : ["all", [">=", "point_count", layer[0]], ["<", "point_count", layers[i - 1][0]]]
                            }
                            paint={{
                                "circle-color": layer[1],
                                "circle-radius": 18
                            }}
                        />
                    ))
                }
                <Layer
                    id="cluster-count"
                    type="symbol"
                    source={"unclustered-points"}
                    filter={["has", "point_count"]}
                    layout={{
                        "text-field": "{point_count}",
                        "text-size": 14
                    }}
                    paint={{
                        "text-color": "white"
                    }}
                />
            </Map>
        )
    }
}

export default PointCluster;
