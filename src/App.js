import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Lottery from "./components/Lottery";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Lottery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
