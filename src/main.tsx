import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';

// Import i18n
import './i18n/i18n';

// Import des pages
import Login from './pages/client/Login';
import Dashboard from './pages/client/Dashboard';
import MesDemandes from './pages/client/MesDemandes';
import NouvelleDemande from './pages/client/NouvelleDemande';
import TicketDetails from './pages/client/TicketDetails';
import MaSociete from './pages/client/MaSociete';
import Profile from './pages/client/Profile';

import ConsultantTickets from './pages/consultant/ConsultantTickets';
import ConsultantInterventions from './pages/consultant/ConsultantInterventions';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDemandes from './pages/admin/AdminDemandes';
import AdminInterventions from './pages/admin/AdminInterventions';
import Configurations from './pages/admin/Configurations';
import GestionUtilisateurs from './pages/admin/GestionUtilisateurs';
import Rapports from './pages/admin/Rapports';

import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      {/* ✅ Le conteneur Toastify doit être placé ici pour afficher les notifications globales */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route path="/" element={<Navigate to="/connexion" replace />} />
        <Route path="/connexion" element={<Login />} />

        {/* Routes Client */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['client', 'admin', 'consultant']}>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mes-demandes"
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <Layout>
                <MesDemandes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/nouvelle-demande"
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <Layout>
                <NouvelleDemande />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ticket/:id"
          element={
            <ProtectedRoute allowedRoles={['client', 'consultant', 'admin']}>
              <Layout>
                <TicketDetails />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ma-societe"
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <Layout>
                <MaSociete />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['client', 'consultant', 'admin']}>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Routes Consultant */}
        <Route
          path="/consultant/tickets"
          element={
            <ProtectedRoute allowedRoles={['consultant']}>
              <Layout>
                <ConsultantTickets />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/consultant/interventions"
          element={
            <ProtectedRoute allowedRoles={['consultant']}>
              <Layout>
                <ConsultantInterventions />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/consultant/ticket/:id"
          element={
            <ProtectedRoute allowedRoles={['consultant']}>
              <Layout>
                <TicketDetails />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Routes Admin */}
        <Route
          path="/admin/demandes"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <AdminDemandes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/interventions"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <AdminInterventions />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/configurations"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <Configurations />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/gestion-utilisateurs"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <GestionUtilisateurs />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rapports"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <Rapports />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Route de fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(<App />);