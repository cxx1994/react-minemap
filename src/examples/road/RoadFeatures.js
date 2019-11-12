import React from 'react';
import Map from "../../components/map";
import Popup from '../../components/popup';

const mapStyleUrl = "http://minedata.cn/service/solu/style/id/2365";

class RoadFeatures extends React.Component {
    state = {
        cursor: '',
        feature: {},
        lngLat: null,
    };

    roadLayerIds = [];

    componentDidMount() {
        this.init();
    }

    init = () => {
        window.minemap.util.getJSON(mapStyleUrl, (error, data) => {
            data.layers.forEach((layer) => {
                //判断是否道路线图层
                if (
                    layer.type === 'line'
                    && (layer.source === 'Merge_1' || layer.source === 'Road')
                    && layer['source-layer'] === 'Road'
                ) {
                    this.roadLayerIds.push(layer.id);
                }
            });
        })
    };

    handleMapMousemove = (e, map) => {
        let features = map.queryRenderedFeatures(e.point, { layers: this.roadLayerIds });
        let cursor = (features.length > 0) ? 'pointer' : '';

        if (cursor !== this.state.cursor) {
            this.setState({
                cursor
            });
        }
    };

    handleMapClick = (e, map) => {
        let features = map.queryRenderedFeatures(e.point, { layers: this.roadLayerIds });

        if (features.length < 1) {
            this.setState({
                feature: {},
                lngLat: null,
            });
            return;
        }

        this.setState({
            feature: features[0],
            lngLat: e.lngLat,
        });
    };

    render() {
        const { cursor, lngLat, feature } = this.state;
        const { properties } = feature;

        return (
            <Map
                styleUrl={mapStyleUrl}
                center={[116.46, 39.92]}
                zoom={16}
                pitch={60}
                maxZoom={17}
                minZoom={6}
                cursor={cursor}
                events={{
                    mousemove: this.handleMapMousemove,
                    click: this.handleMapClick
                }}
            >
                {
                    lngLat && properties && (
                        <Popup
                            closeButton={false}
                            closeOnClick={false}
                            position={lngLat}
                        >
                            <div>
                                <div>LINK Id：{properties.pid}</div>
                                <div>道路名称：{properties.name_zh}</div>
                                <div>功能等级：{properties.functionclass}</div>
                                <div>道路种别：{properties.kind}</div>
                                <div>道路属性：{properties.form}</div>
                                <div>供用信息：{properties.const_st}</div>
                                <div>道路长度：{window.turf.length(feature.geometry)}千米</div>
                            </div>
                        </Popup>
                    )
                }
            </Map>
        )
    }
}

export default RoadFeatures;
