import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import {
  DashboardHome,
  Practice,
  Assessments,
  Resources,
  Profile,
  AnalysisResults,
  AnalysisHistory,
  TestChecklist,
  ShipPage,
  ProofPage
} from './pages/DashboardPages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard Routes (Nested) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="practice" element={<Practice />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="history" element={<AnalysisHistory />} />
          <Route path="results" element={<AnalysisResults />} />
          <Route path="resources" element={<Resources />} />
          <Route path="profile" element={<Profile />} />
          <Route path="07-test" element={<TestChecklist />} />
          <Route path="08-ship" element={<ShipPage />} />
          <Route path="proof" element={<ProofPage />} />
        </Route>

        {/* PRP Specific Routes */}
        <Route path="/prp/07-test" element={<DashboardLayout />} >
          <Route index element={<TestChecklist />} />
        </Route>
        <Route path="/prp/08-ship" element={<DashboardLayout />} >
          <Route index element={<ShipPage />} />
        </Route>
        <Route path="/prp/proof" element={<DashboardLayout />} >
          <Route index element={<ProofPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
