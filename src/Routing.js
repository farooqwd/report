import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Form from "./Pages/Form/Form";
import Single from "./Pages/Single/Single";

export default function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/" element={<Home />} />
        <Route path="/single" element={<Single />} />
      </Routes>
    </div>
  );
}
