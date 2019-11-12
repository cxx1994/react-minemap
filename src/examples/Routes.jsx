import React from "react";
import { Route, Redirect, HashRouter, Switch } from "react-router-dom";
import Layout from "./Layout";
import './style/index.css';

import BaseMap from "./map-example/BaseMap";
import MoveMap from "./map-example/MoveMap";
import WaterEffect from "./map-example/WaterEffect";
import ZoomRestrict from "./map-example/ZoomRestrict";

import Marker from "./overlay/Marker";
import GeojsonMarker from "./overlay/GeojsonMarker";
import CustomMarker from "./overlay/CustomMarker";
import SpreadMarker from "./overlay/SpreadMarker";
import Popup from "./overlay/Popup";
import MarkerPopup from "./overlay/MarkerPopup";
import AddDeleteMarker from "./overlay/AddDeleteMarker";

import Control from "./control/Control";
import ControlSelf from "./control/ControlSelf";

import Raster from "./layer/Raster";
import LayerImage from "./layer/LayerImage";
import LayerVideo from "./layer/LayerVideo";
import LayerBuilding from "./layer/LayerBuilding";
import LayerHide from "./layer/LayerHide";
import LayerMasking from "./layer/LayerMasking";
import PointCluster from "./layer/PointCluster";
import LayerArrow from "./layer/LayerArrow";
import LayerIconImage from "./layer/LayerIconImage";

import GeojsonIcon from "./interaction/GeojsonIcon";
import GeojsonPoint from "./interaction/GeojsonPoint";
import GeojsonLine from "./interaction/GeojsonLine";
import GeojsonPolygon from "./interaction/GeojsonPolygon";
import GeojsonCircle from "./interaction/GeojsonCircle";
import GeojsonRealCircle from "./interaction/GeojsonRealCircle";
import DraggablePoint from "./interaction/DraggablePoint";
import DraggableMarker from "./interaction/DraggableMarker";

import MouseStyle from "./mouse/MouseStyle";
import MousePointer from "./mouse/MousePointer";

import Events from "./event/Events";
import Fly from "./event/Fly";

import RoadFeatures from "./road/RoadFeatures";
import RoadFeatures2 from "./road/RoadFeatures2";
import TrafficFeatures from "./road/TrafficFeatures";

import PointsDistance from "./compute/PointsDistance";
import MeasureArea from "./compute/MeasureArea";

import Statistics from "./custom/Statistics";

const Router = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/base/index" />} />
            <Layout>
                <Switch>
                    <Route path="/base/index" component={BaseMap} />
                    <Route path="/base/move" component={MoveMap} />
                    <Route path="/base/water/effect" component={WaterEffect} />
                    <Route path="/base/zoom" component={ZoomRestrict} />

                    <Route path="/overlay/index" component={Marker} />
                    <Route path="/overlay/geojson" component={GeojsonMarker} />
                    <Route path="/overlay/custom" component={CustomMarker} />
                    <Route path="/overlay/spread" component={SpreadMarker} />
                    <Route path="/overlay/popup" component={Popup} />
                    <Route path="/overlay/markerPopup" component={MarkerPopup} />
                    <Route path="/overlay/addDeleteMarker" component={AddDeleteMarker} />

                    <Route path="/control/index" component={Control} />
                    <Route path="/control/self" component={ControlSelf} />

                    <Route path="/layer/raster" component={Raster} />
                    <Route path="/layer/image" component={LayerImage} />
                    <Route path="/layer/video" component={LayerVideo} />
                    <Route path="/layer/building" component={LayerBuilding} />
                    <Route path="/layer/hide" component={LayerHide} />
                    <Route path="/layer/masking" component={LayerMasking} />
                    <Route path="/layer/cluster" component={PointCluster} />
                    <Route path="/layer/arrow" component={LayerArrow} />
                    <Route path="/layer/iconImage" component={LayerIconImage} />

                    <Route path="/interaction/geojsonIcon" component={GeojsonIcon} />
                    <Route path="/interaction/geojsonPoint" component={GeojsonPoint} />
                    <Route path="/interaction/geojsonLine" component={GeojsonLine} />
                    <Route path="/interaction/geojsonPolygon" component={GeojsonPolygon} />
                    <Route path="/interaction/geojsonCircle" component={GeojsonCircle} />
                    <Route path="/interaction/geojsonRealCircle" component={GeojsonRealCircle} />
                    <Route path="/interaction/draggable/point" component={DraggablePoint} />
                    <Route path="/interaction/draggable/marker" component={DraggableMarker} />

                    <Route path="/mouse/style" component={MouseStyle} />
                    <Route path="/mouse/pointer" component={MousePointer} />

                    <Route path="/event/events" component={Events} />
                    <Route path="/event/fly" component={Fly} />

                    <Route path="/road/features" component={RoadFeatures} />
                    <Route path="/road/features2" component={RoadFeatures2} />
                    <Route path="/road/traffic" component={TrafficFeatures} />

                    <Route path="/compute/points/distance" component={PointsDistance} />
                    <Route path="/compute/measure/area" component={MeasureArea} />

                    <Route path="/custom/statistics" component={Statistics} />
                </Switch>
            </Layout>
        </Switch>
    </HashRouter>
);

export default Router;
