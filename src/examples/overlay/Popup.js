import React from 'react';
import Map from '../../components/map';
import Popup from '../../components/popup';

class PopupMap extends React.Component {
    render() {
        return (
            <Map
                styleUrl="http://minedata.cn/service/solu/style/id/2365"
                center={[116.46, 39.92]}
                zoom={14}
                pitch={60}
                style={{ height: "calc(100vh)" }}
            >
                <Popup
                    closeOnClick={true}
                    closeButton={true}
                    offset={[0, 0]}
                    position={[116.46, 39.92]}
                >
                    <h1>我是一个信息窗体1</h1>
                </Popup>
                <Popup
                    closeOnClick={true}
                    closeButton={true}
                    offset={[0, 0]}
                    anchor={'left'}
                    position={[116.46, 39.92 + 0.01]}
                    text={'我是一个信息窗体2'}
                />
                <Popup
                    closeOnClick={true}
                    closeButton={true}
                    offset={[0, 0]}
                    position={[116.46, 39.92 - 0.006]}
                >
                    <div className="function-detail">
                        <div style={{ color: 'blank' }}><span>内容1</span></div>
                        <div style={{ color: 'green' }}><span>内容2</span></div>
                        <div style={{ color: 'blue' }}><span>内容3</span></div>
                    </div>
                </Popup>
                <Popup
                    closeOnClick={true}
                    closeButton={true}
                    offset={[0, 0]}
                    position={[116.46, 39.92 - 0.01]}
                >
                    <div>
                        <div style={{ color: 'red', cursor: 'pointer' }} onClick={() => alert('点击事件')}>点击事件</div>
                        <div>事件内容</div>
                    </div>
                </Popup>
            </Map>
        )
    }
}

export default PopupMap;
