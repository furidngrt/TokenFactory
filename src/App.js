import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TokenFactory from "./TokenFactory";
import About from "./About";
import Docs from "./Docs";
import Faq from "./Faq";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TokenFactory />} />
        <Route path="/about" element={<About />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/faq" element={<Faq />} />

      </Routes>
    </Router>
  );
}

export default App;
