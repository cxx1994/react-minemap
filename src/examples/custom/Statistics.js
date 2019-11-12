import React from 'react';
import Map from "../../components/map";
import Layer from "../../components/layer";

class Statistics extends React.Component {
    state = {
        county: null,
    };

    componentDidMount() {
        this.init();
    }

    init = () => {
        const promiseList = [
            this.fetchProvinceJson(),
            this.fetchCountyJson()
        ];

        Promise.all(promiseList).then(() => {
            this.forceUpdate();
        })
    };

    fetchProvinceJson = () => {
        return import('../assets/yunnan.json')
            .then(res => this.provinceJson = res.default);
    };

    fetchCountyJson = () => {
        return import('../assets/couties.json')
            .then(res => this.countyJson = res.default);
    };

    getSource = () => {
        const { county } = this.state;
        const source = {
            "type": "geojson",
        };

        if (!county) {
            source.data = this.provinceJson || {};
        } else {
            source.data = this.countyJson.find(item => item.name === county).data;
        }

        // 初始化颜色
        source.data.features && source.data.features.forEach(feature => {
            feature.properties.color = '#00559b';
        });

        return source;
    };

    handleMapClick = (e, map, features) => {
        this.map = map;

        if (!features.length) {
            return;
        }

        if (!this.state.county) {
            this.setState({
                county: features[0].properties.name
            });

            map.flyTo({
                center: JSON.parse(features[0].properties.cp),
                bearing: 0,
                duration: 1000,
                zoom: 8
            })
        }
    };

    back = () => {
        this.setState({
            county: null
        });
        this.map.flyTo({
            center: [101.92027303378956, 22.575556266777895],
            bearing: 0,
            duration: 1000,
            zoom: 7
        })
    };

    render() {
        const source = this.getSource();

        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[102.9199, 25.4663]}
                zoom={7}
                pitch={60}
                maxZoom={18}
                minZoom={6}
                logoControl={false}
                style={{ height: 'calc(100vh)' }}
            >
                <div id="wrap">
                    <span onClick={this.back}>全省</span>
                    {
                        this.state.county && (
                            <span>>{this.state.county}</span>
                        )
                    }
                </div>
                <Layer
                    id="map"
                    type="fill"
                    source={source}
                    paint={{
                        'fill-color': {
                            'type': 'identity',
                            'property': 'color'
                        },
                        'fill-opacity': 1,
                        'fill-outline-color': '#3379AE'
                    }}
                    emphasis={{
                        'color': '#168AFF'
                    }}
                    events={{
                        click: this.handleMapClick
                    }}

                />
                <Layer
                    id="line"
                    type="line"
                    source="map"
                    layout={{
                        'line-join': 'round',
                        'line-cap': 'round'
                    }}
                    paint={{
                        'line-color': 'gray',
                        'line-width': 3
                    }}
                />
                <Layer
                    id="name"
                    type="symbol"
                    source="map"
                    layout={{
                        'text-size': 16,
                        'text-field': '{name}',
                        'text-offset': [0, 0.6],
                        'text-anchor': 'top'
                    }}
                    paint={{
                        'text-color': '#fff',
                    }}
                />
            </Map>
        )
    }
}

export default Statistics;
