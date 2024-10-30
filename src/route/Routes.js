import * as React from 'react';
import Candidates from '../pages/Candidates';
import MapPage from '../pages/mapPage';
import { Routes, Route } from "react-router-dom";

function MyRoutes() {
  return (
    <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/candidates/:id" element={<Candidates />} />
  </Routes>
  );
}

export default MyRoutes;