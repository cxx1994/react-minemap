import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";

class LayerBuilding extends React.Component {
    render() {
        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={16}
                pitch={60}
                maxZoom={17}
                style={{ height: "100%" }}
            >
                <Layer
                    id="building-layer"
                    type="extrusion"
                    source={{
                        'type': "vector",
                        'tiles': ["minemapdata://Buildingmore/{z}/{x}/{y}"]
                    }}
                    source-layer="Buildingmore"
                    minzoom={14}
                    maxzoom={17.5}
                    layout={{
                        "visibility": "visible"
                    }}
                    paint={{
                        "extrusion-base": 0, /*基础高度*/
                        "extrusion-color": "#FFEFD5", /*颜色*/
                        "extrusion-height": {"property": "levels", "type": "identity"}, /*高度*/
                        "extrusion-opacity": 1, /*不透明度(%)*/
                        "extrusion-pattern": "sion-material-32",/*纹理,如果需要贴图，加入此行参数*/
                        "extrusion-translate": [0, 0], /*建筑物偏移*/
                        "extrusion-translate-anchor": "map" /*建筑物偏移锚点：值域map-正北，viewport--视野*/
                    }}
                />
            </Map>
        )
    }
}

export default LayerBuilding;
