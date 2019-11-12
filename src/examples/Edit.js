import React from 'react';
import Map from "../components/map";
import Edit from "../components/edit";

class MapEdit extends React.Component {
    state = {
        mode: "",
        editData: {
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                properties: {},
                geometry: { type: 'Point', coordinates: [116.46 + 0.003, 39.92 + 0.002] }
            }, {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: [[116.46 - 0.005, 39.92 + 0.005], [116.46 - 0.005, 39.92 - 0.005]]
                }
            }, {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'Polygon',
                    coordinates: [[[116.46, 39.92], [116.46, 39.92 + 0.003], [116.46 - 0.003, 39.92 + 0.003], [116.46 - 0.003, 39.92], [116.46, 39.92]]]
                }
            }]
        }
    };

    handleModeChange = (e) => {
        this.setState({
            mode: e.target ? e.target.value : e
        })
    };

    handleDelete = () => {
        this.setState({
            mode: "trash"
        })
    };

    handleReset = () => {
        this.setState({
            editData: {
                type: 'FeatureCollection',
                features: []
            }
        })
    };

    handleChange = (data) => {
        this.setState({
            editData: data
        })
    };

    render() {
        return (
            <Map
                container="testMapEdit"
                center={[116.46, 39.92]}
                zoom={15}
                style={{ height: "calc(100vh)" }}
            >
                <div className="edit-ctrl" style={{
                    position: 'absolute',
                    zIndex: '300',
                    top: '10px',
                    right: '10px',
                    overflow: 'hidden'
                }}>
                    <select name="mode" id="mode" style={{ pointerEvents: "all" }} onChange={this.handleModeChange}>
                        <option value="polygon">多边形</option>
                        <option value="line">连线拓展</option>
                        <option value="circle">圆形</option>
                    </select>
                    <button style={{ pointerEvents: "all" }} onClick={this.handleDelete}>删除当前选择</button>
                    <button style={{ pointerEvents: "all" }} onClick={this.handleReset}>重置</button>
                </div>
                <Edit
                    value={this.state.editData}
                    mode={this.state.mode}
                    enableDraw={true}
                    boxSelect={true}
                    touchEnabled={true}
                    displayControlsDefault={true}
                    showButtons={false}
                    onChange={this.handleChange}
                />
            </Map>
        )
    }
}

export default MapEdit;
