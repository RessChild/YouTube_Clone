import './App.css';
import { useEffect } from 'react';
import axios from "axios";
import { Redirect, Route, BrowserRouter, Switch } from "react-router-dom";

import VideoFrame from './frames/VideoFrame';
import IdentifyFrame from "./frames/IdentifyFrame";

function App() {

  // useEffect(() => {
  //   // 일반 경로 테스트
  //   axios.get('/example')
  //     .then( ({ data }) => console.log("example test:", data) )
  //     .catch( e => console.log(e) );

  //   // DB 연동 테스트
  //   axios.get('/example/database')
  //     .then( ({ data }) => console.log("database test:", data) )
  //     .catch( e => console.log(e) );
  // }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/identify" component={IdentifyFrame} />
        <Route path="/" component={VideoFrame} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
