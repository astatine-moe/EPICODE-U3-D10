import logo from "./logo.svg";
import "./App.scss";

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavbar from "./components/Navbar";
import { IconContext } from "react-icons";
import Home from "./pages/Home";
import mainBg from "./img/mainbg.jpg";
import City from "./pages/City";

function App() {
    const [bgImg, setBgImg] = useState(mainBg);
    return (
        <BrowserRouter>
            <div className="uk-light">
                <MyNavbar />
                <main>
                    <img src={bgImg} />
                    <div className="mainContainer">
                        <div className="app">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/city/:lat/:lon/:city"
                                    element={<City setBgImg={setBgImg} />}
                                />
                            </Routes>
                        </div>
                    </div>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
