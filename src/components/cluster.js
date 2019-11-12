import Layer from "./layer";
import { removeLayers, removeSources } from "../core/util";

class Cluster extends Layer {
    static defaultProps = {
        setIcons: [],
        data: {},
        clusterMaxZoom: 16,
        clusterRadius: 50,
        enableQueryChildren: false,
        iconImage: "{icon}",
        circleRadius: 18,
        textSize: 14,
        textColor: "white"
    };

    componentDidMount() {
        this.id = "cluster-" + new Date().getTime();
        this.initIcons().then(() => {
            this.initialize();
        })
    }

    componentDidUpdate() {
        this.initialize();
    }

    componentWillUnmount() {
        this.destroy();
    }

    destroy() {
        const map = this.props.map;

        removeLayers(map, this.unclusteredLayerId);
        removeLayers(map, this.countLayerId);
        removeLayers(map, this.clusterLayerId);
        removeSources(map, this.sourceId);

        this.unbindEvents(map);
    }

    initialize() {
        const map = this.props.map;

        this.destroy();

        this.sourceId = this.id + "-source";
        map.addSource(this.sourceId, {
            type: "geojson",
            data: this.props.data,
            cluster: true,
            clusterMaxZoom: this.props.clusterMaxZoom,
            clusterRadius: this.props.clusterRadius,
            enableQueryChildren: this.props.enableQueryChildren
        });

        //添加非聚合图层
        this.unclusteredLayerId = this.id + "-layer-unclustered";
        map.addLayer({
            "id": this.unclusteredLayerId,
            "type": "symbol",
            "source": this.sourceId,
            "filter": ["!has", "point_count"],
            "layout": {
                "icon-image": this.props.iconImage
            }
        });

        //添加聚合图层
        const layers = [[1000, '#f28cb1'], [100, '#f1f075'], [0, '#51bbd6']];
        this.clusterLayerId = [];

        layers.forEach((layer, i) => {
            const id = this.id + "-layer-" + i;
            map.addLayer({
                "id": id,
                "type": "circle",
                "source": this.sourceId,
                "paint": {
                    "circle-color": layer[1],
                    "circle-radius": this.props.circleRadius
                },
                "filter": i === 0 ?
                    [">=", "point_count", layer[0]] :
                    ["all", [">=", "point_count", layer[0]], ["<", "point_count", layers[i - 1][0]]]
            });
            this.clusterLayerId.push(id);
        });

        //添加数量图层
        this.countLayerId = this.id + "-layer-count";
        map.addLayer({
            "id": this.countLayerId,
            "type": "symbol",
            "source": this.sourceId,
            "layout": {
                "text-field": "{point_count}",
                "text-size": this.props.textSize
            },
            "paint": {
                "text-color": this.props.textColor
            },
            "filter": ["has", "point_count"]
        });

        this.bindEvents(map);
    }

    render() {
        return null;
    }
}

export default Cluster;