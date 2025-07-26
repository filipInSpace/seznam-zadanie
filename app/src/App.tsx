import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CreateList from "./pages/CreateList";
import EditList from "./pages/EditList";
import ListDetail from "./pages/ListDetail";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateList />} />
      <Route path="/edit/:id" element={<EditList />} />
      <Route path="/list/:id" element={<ListDetail />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
