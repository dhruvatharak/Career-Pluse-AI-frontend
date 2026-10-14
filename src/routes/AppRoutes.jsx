/**
 * CareerPulse AI - Application Routes Configuration
 * Configures client-side routing, route-level code splitting (lazy loading), and protected routes.
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/layout/ProtectedRoute.jsx';
import Loader from '../components/common/Loader.jsx';

// Route-level code splitting via dynamic imports
const Home = lazy(() => import('../pages/Home.jsx'));
const Login = lazy(() => import('../pages/Login.jsx'));
const Register = lazy(() => import('../pages/Register.jsx'));
const Profile = lazy(() => import('../pages/Profile.jsx'));
const NotFound = lazy(() => import('../pages/NotFound.jsx'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader message="Loading page..." />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
