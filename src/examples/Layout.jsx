import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from "react-router-dom";
import "antd/dist/antd.css";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
    constructor(props) {
        super(props);
        const pathname = this.props.location.pathname;
        const defaultSelectedKey = pathname.slice(1);
        const defaultOpenKey = defaultSelectedKey.split("/")[0];

        this.state = {
            defaultSelectedKeys: [defaultSelectedKey],
            defaultOpenKeys: [defaultOpenKey],
        }
    }

    render() {
        const { defaultSelectedKeys, defaultOpenKeys } = this.state;

        return (
            <Layout style={{ height: 'calc(100vh)' }}>
                <Sider trigger={null} width={220}>
                    <div className="logo"/>
                    <Menu
                        style={{ textAlign: 'left' }}
                        defaultSelectedKeys={defaultSelectedKeys}
                        defaultOpenKeys={defaultOpenKeys}
                        mode="inline"
                        theme="dark"
                    >
                        <SubMenu
                            key="base"
                            title={<span><Icon type="mail"/><span>地图示例</span></span>}
                        >
                            <Menu.Item key="base/index"><Link to='/base/index'>基础地图</Link></Menu.Item>
                            <Menu.Item key="base/move"><Link to='/base/move'>移动地图</Link></Menu.Item>
                            <Menu.Item key="base/water/effect"><Link to='/base/water/effect'>水纹特效</Link></Menu.Item>
                            <Menu.Item key="base/zoom"><Link to='/base/zoom'>地图缩放级别限制</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="overlay"
                            title={<span><Icon type="mail"/><span>覆盖物示例</span></span>}
                        >
                            <Menu.Item key="overlay/index"><Link to='/overlay/index'>地图标注</Link></Menu.Item>
                            <Menu.Item key="overlay/geojson"><Link to='/overlay/geojson'>用GEOJSON生成标注</Link></Menu.Item>
                            <Menu.Item key="overlay/custom"><Link to='/overlay/custom'>添加自定义标注</Link></Menu.Item>
                            <Menu.Item key="overlay/spread"><Link to='/overlay/spread'>添加圆形扩散效果标注</Link></Menu.Item>
                            <Menu.Item key="overlay/popup"><Link to='/overlay/popup'>添加信息窗体</Link></Menu.Item>
                            <Menu.Item key="overlay/markerPopup"><Link
                                to='/overlay/markerPopup'>标注绑定信息窗体</Link></Menu.Item>
                            <Menu.Item key="overlay/addDeleteMarker"><Link
                                to='/overlay/addDeleteMarker'>添加删除标记</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="control"
                            title={<span><Icon type="mail"/><span>地图控件</span></span>}
                        >
                            <Menu.Item key="control/index"><Link to='/control/index'>控件</Link></Menu.Item>
                            <Menu.Item key="control/self"><Link to='/control/self'>自定义控件</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="layer"
                            title={<span><Icon type="mail"/><span>图层示例</span></span>}
                        >
                            <Menu.Item key="layer/raster"><Link to='/layer/raster'>添加删格图层</Link></Menu.Item>
                            <Menu.Item key="layer/image"><Link to='/layer/image'>添加图像图层</Link></Menu.Item>
                            <Menu.Item key="layer/video"><Link to='/layer/video'>添加视频图层</Link></Menu.Item>
                            <Menu.Item key="layer/building"><Link to='/layer/building'>添加建筑图层</Link></Menu.Item>
                            <Menu.Item key="layer/hide"><Link to='/layer/hide'>图层隐藏</Link></Menu.Item>
                            <Menu.Item key="layer/masking"><Link to='/layer/masking'>图层蒙版</Link></Menu.Item>
                            <Menu.Item key="layer/cluster"><Link to='/layer/cluster'>点聚合</Link></Menu.Item>
                            <Menu.Item key="layer/arrow"><Link to='/layer/arrow'>添加箭头</Link></Menu.Item>
                            <Menu.Item key="layer/iconImage"><Link to='/layer/iconImage'>单一图层显示多个图标</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="interaction"
                            title={<span><Icon type="mail"/><span>交互示例</span></span>}
                        >
                            <Menu.Item key="interaction/geojsonIcon">
                                <Link to='/interaction/geojsonIcon'>绘制自定义图标</Link>
                            </Menu.Item>
                            <Menu.Item key="interaction/geojsonPoint">
                                <Link to='/interaction/geojsonPoint'>绘制GEOJSON点</Link>
                            </Menu.Item>
                            <Menu.Item key="interaction/geojsonLine">
                                <Link to='/interaction/geojsonLine'>绘制GEOJSON线</Link>
                            </Menu.Item>
                            <Menu.Item key="interaction/geojsonPolygon">
                                <Link to='/interaction/geojsonPolygon'>绘制GEOJSON面</Link>
                            </Menu.Item>
                            <Menu.Item key="interaction/geojsonCircle">
                                <Link to='/interaction/geojsonCircle'>绘制GEOJSON圆</Link>
                            </Menu.Item>
                            <Menu.Item key="interaction/geojsonRealCircle">
                                <Link to='/interaction/geojsonRealCircle'>根据经纬度和半径画圆</Link>
                            </Menu.Item>
                            <Menu.Item key="interaction/draggable/point">
                                <Link to='/interaction/draggable/point'>点拖拽</Link>
                            </Menu.Item>
                            <Menu.Item key="interaction/draggable/marker">
                                <Link to='/interaction/draggable/marker'>marker拖拽</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="mouse"
                            title={<span><Icon type="mail"/><span>鼠标示例</span></span>}
                        >
                            <Menu.Item key="mouse/style"><Link to='/mouse/style'>设置鼠标样式</Link></Menu.Item>
                            <Menu.Item key="mouse/pointer"><Link to='/mouse/pointer'>获取鼠标点击位置</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="event"
                            title={<span><Icon type="mail"/><span>事件示例</span></span>}
                        >
                            <Menu.Item key="event/events"><Link to='/event/events'>地图事件</Link></Menu.Item>
                            <Menu.Item key="event/fly"><Link to='/event/fly'>飞行</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="road"
                            title={<span><Icon type="mail"/><span>路况示例</span></span>}
                        >
                            <Menu.Item key="road/features"><Link to='/road/features'>获取道路相关属性信息</Link></Menu.Item>
                            <Menu.Item key="road/features2"><Link to='/road/features2'>根据范围获取道路信息</Link></Menu.Item>
                            <Menu.Item key="road/traffic"><Link to='/road/traffic'>获取路况相关信息</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="compute"
                            title={<span><Icon type="mail"/><span>几何计算</span></span>}
                        >
                            <Menu.Item key="compute/points/distance"><Link
                                to='/compute/points/distance'>计算两点之间的距离</Link></Menu.Item>
                            <Menu.Item key="compute/measure/area"><Link to='/compute/measure/area'>面积测量</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="custom"
                            title={<span><Icon type="mail"/><span>我的demo</span></span>}
                        >
                            <Menu.Item key="custom/statistics"><Link to='/custom/statistics'>数据统计</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280,
                    }}
                >
                    {this.props.children}
                </Content>
            </Layout>
        );
    }
}

export default withRouter(SiderDemo);