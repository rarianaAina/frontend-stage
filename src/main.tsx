import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Connexion from './pages/Connexion'
import ListeUtilisateurs from './pages/ListeUtilisateurs'
import EditionUtilisateur from './pages/EditionUtilisateur'

function App(){
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Accueil</Link> | <Link to="/utilisateurs">Utilisateurs</Link> | <Link to="/connexion">Connexion</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Bienvenue</div>} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/utilisateurs" element={<ListeUtilisateurs />} />
        <Route path="/utilisateurs/nouveau" element={<EditionUtilisateur />} />
        <Route path="/utilisateurs/:id" element={<EditionUtilisateur />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(<App />)