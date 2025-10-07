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
import Profile from './pages/client/Profile'

import ConsultantTickets from './pages/consultant/ConsultantTickets'
import ConsultantInterventions from './pages/consultant/ConsultantInterventions'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminDemandes from './pages/admin/AdminDemandes'
import AdminInterventions from './pages/admin/AdminInterventions'
import Configurations from './pages/admin/Configurations'
import GestionUtilisateurs from './pages/admin/GestionUtilisateurs'
import Rapports from './pages/admin/Rapports'

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
        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={['client', 'consultant', 'admin']}>
            <Profile />
          </ProtectedRoute>
        } />

        {/* Routes Consultant */}
        <Route path="/consultant/tickets" element={
          <ProtectedRoute allowedRoles={['consultant']}>
            <ConsultantTickets />
          </ProtectedRoute>
        } />
        <Route path="/consultant/interventions" element={
          <ProtectedRoute allowedRoles={['consultant']}>
            <ConsultantInterventions />
          </ProtectedRoute>
        } />
        <Route path="/consultant/ticket/:id" element={
          <ProtectedRoute allowedRoles={['consultant']}>
            <TicketDetails />
          </ProtectedRoute>
        } />

        {/* Routes Admin */}
        <Route path="/admin/demandes" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDemandes />
          </ProtectedRoute>
        } />
        <Route path="/admin/interventions" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminInterventions />
          </ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/configurations" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Configurations />
          </ProtectedRoute>
        } />
        <Route path="/admin/gestion-utilisateurs" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <GestionUtilisateurs />
          </ProtectedRoute>
        } />
        <Route path="/admin/rapports" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Rapports />
          </ProtectedRoute>
        } />

        {/* Route de fallback pour les URLs non trouvées */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(<App />)