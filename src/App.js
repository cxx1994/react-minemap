import React from 'react';
import Routes from "./examples/Routes";
import './App.css';

function App() {
    window.minemap.domainUrl = '//minedata.cn';
    window.minemap.dataDomainUrl = '//datahive.minedata.cn';
    window.minemap.spriteUrl = '//minedata.cn/minemapapi/v2.0.0/sprite/sprite';
    window.minemap.serviceUrl = '//minedata.cn/service';
    window.minemap.accessToken = '25cc55a69ea7422182d00d6b7c0ffa93';
    window.minemap.solution = 2365;

    return (
        <div className="App">
            <Routes />
        </div>
    );
}

export default App;
