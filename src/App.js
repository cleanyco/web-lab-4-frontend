import React from 'react';
import Intro from "./pages/intro";
import {BrowserRouter} from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/main";

//todo сделать компонент функциональным
class App extends React.Component {
  render() {
    return (
        <BrowserRouter basename="/">
            <Routes>
                {/*//fixme здесь, скорее всего, exact не понадобится*/}
                <Route exact path="/intro" element={<Intro/>}/>
                <Route path="/main" element={<Main/>}/>
            </Routes>

        </BrowserRouter>
    )
  }
}

export default App;
