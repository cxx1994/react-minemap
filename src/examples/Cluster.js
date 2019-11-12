import React from 'react';
import Map from "../components/map";
import Cluster from "../components/cluster";
import Popup from "../components/popup";
import markerBlue from "../assets/images/marker_blue.png";

class MapCluster extends React.Component {
    state = {
        data: {},
        selectedPointData: {
            coordinate: [121.90154, 29.46968]
        },
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        import("../inc/poi_cluster.json").then(result => {
            this.setState({
                data: result.default
            })
        })
    }

    handlePointClick(data) {
        this.setState({
            selectedPointData: data
        })
    }

    render() {
        const self = this;
        console.log(this.state.selectedPointData);

        return (
            <Map
                container="testMapCluster"
                center={[121.90154, 29.46968]}
                style={{ height: "calc(100vh)" }}
            >
                <Cluster
                    icons={{
                        blue: markerBlue
                    }}
                    data={this.state.data}
                    clusterMaxZoom={16}
                    clusterRadius={50}
                    enableQueryChildren={false}
                    iconImage={"blue"}
                    circleRadius={30}
                    textSize={14}
                    textColor="#ffffff"
                    events={{
                        mousemove: function(e) {
                            let features = this.props.map.queryRenderedFeatures(e.point, {layers: [this.unclusteredLayerId]});
                            this.props.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
                        },
                        click: function (e) {
                            let features = this.props.map.queryRenderedFeatures(e.point, {layers: [this.unclusteredLayerId]});

                            if (features.length) {
                                self.handlePointClick({
                                    coordinate: features[0].geometry.coordinates
                                })
                            }
                        }
                    }}
                />
                <Popup coordinate={this.state.selectedPointData.coordinate} closeButton={true}>
                    <div>popup</div>
                </Popup>
            </Map>
        )
    }
}

export default MapCluster;
