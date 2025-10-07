import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles/global.css'

import Login from './pages/client/Login'
import Dashboard from './pages/client/Dashboard'
import MesDemandes from './pages/client/MesDemandes'
import NouvelleDemande from './pages/client/NouvelleDemande'
import TicketDetails from './pages/client/TicketDetails'
import MaSociete from './pages/client/MaSociete'

import ConsultantTickets from './pages/consultant/ConsultantTickets'

import AdminDashboard from './pages/admin/AdminDashboard'
import GestionUtilisateurs from './pages/admin/GestionUtilisateurs'

import ProtectedRoute from './components/ProtectedRoute'

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/connexion" replace />} />
        <Route path="/connexion" element={<Login />} />

        {/* Routes Client */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['client', 'admin', 'consultant']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/mes-demandes" element={
          <ProtectedRoute allowedRoles={['client']}>
            <MesDemandes />
          </ProtectedRoute>
        } />
        <Route path="/nouvelle-demande" element={
          <ProtectedRoute allowedRoles={['client']}>
            <NouvelleDemande />
          </ProtectedRoute>
        } />
        <Route path="/ticket/:id" element={
          <ProtectedRoute allowedRoles={['client', 'consultant', 'admin']}>
            <TicketDetails />
          </ProtectedRoute>
        } />
        <Route path="/ma-societe" element={
          <ProtectedRoute allowedRoles={['client']}>
            <MaSociete />
          </ProtectedRoute>
        } />

        {/* Routes Consultant */}
        <Route path="/consultant/tickets" element={
          <ProtectedRoute allowedRoles={['consultant', 'admin']}>
            <ConsultantTickets />
          </ProtectedRoute>
        } />
        <Route path="/consultant/interventions" element={
          <ProtectedRoute allowedRoles={['consultant', 'admin']}>
            <ConsultantTickets />
          </ProtectedRoute>
        } />
        <Route path="/consultant/ticket/:id" element={
          <ProtectedRoute allowedRoles={['consultant', 'admin']}>
            <TicketDetails />
          </ProtectedRoute>
        } />

        {/* Routes Admin */}
        <Route path="/admin/demandes" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ConsultantTickets />
          </ProtectedRoute>
        } />
        <Route path="/admin/interventions" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ConsultantTickets />
          </ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/configurations" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)', fontSize: '24px' }}>
              Configuration Page - Coming Soon
            </div>
          </ProtectedRoute>
        } />
        <Route path="/admin/gestion-utilisateurs" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <GestionUtilisateurs />
          </ProtectedRoute>
        } />

        {/* Route de fallback pour les URLs non trouvées */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(<App />)