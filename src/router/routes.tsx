import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import YourTrees from "../pages/YourTrees";
import App from "../components/App/App";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/your-trees" element={<YourTrees />} />
        <Route path="/tree/:id" element={<App />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
