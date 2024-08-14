import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Preference from "./pages/Preference";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preference" element={<Preference />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
