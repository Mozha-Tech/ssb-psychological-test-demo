import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tests from "./pages/Tests";
import TestDetail from "./pages/TestDetail";
import TestPlayer from "./pages/TestPlayer";
import Result from "./pages/Result";
import { useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function PrivateLayout({ children }) {
  return (
    <div className="app-root">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          {children}
        </main>
      </div>
    </div>
  );
}

/* Guard untuk route yang butuh user */
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={
        <PrivateRoute>
          <PrivateLayout>
            <Dashboard />
          </PrivateLayout>
        </PrivateRoute>
      } />

      <Route path="/tests" element={
        <PrivateRoute>
          <PrivateLayout>
            <Tests />
          </PrivateLayout>
        </PrivateRoute>
      } />

      <Route path="/tests/:id" element={
        <PrivateRoute>
          <PrivateLayout>
            <TestDetail />
          </PrivateLayout>
        </PrivateRoute>
      } />

      <Route path="/play/:id" element={
        <PrivateRoute>
          <PrivateLayout>
            <TestPlayer />
          </PrivateLayout>
        </PrivateRoute>
      } />

      <Route path="/result/:id" element={
        <PrivateRoute>
          <PrivateLayout>
            <Result />
          </PrivateLayout>
        </PrivateRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
