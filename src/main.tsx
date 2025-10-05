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

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/connexion" replace />} />
        <Route path="/connexion" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mes-demandes" element={<MesDemandes />} />
        <Route path="/nouvelle-demande" element={<NouvelleDemande />} />
        <Route path="/ticket/:id" element={<TicketDetails />} />
        <Route path="/ma-societe" element={<MaSociete />} />

        <Route path="/consultant/tickets" element={<ConsultantTickets />} />
        <Route path="/consultant/interventions" element={<ConsultantTickets />} />
        <Route path="/consultant/ticket/:id" element={<TicketDetails />} />

        <Route path="/admin/demandes" element={<ConsultantTickets />} />
        <Route path="/admin/interventions" element={<ConsultantTickets />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/configurations" element={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)', fontSize: '24px' }}>Configuration Page - Coming Soon</div>} />
        <Route path="/admin/gestion-utilisateurs" element={<GestionUtilisateurs />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(<App />)