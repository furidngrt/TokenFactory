import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TokenFactory from "./TokenFactory";
import About from "./About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TokenFactory />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
