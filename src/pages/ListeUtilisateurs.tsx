import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'

type Utilisateur = { id:number; identifiant:string; email?:string; actif:boolean }

export default function ListeUtilisateurs(){
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([])
  useEffect(()=>{ api.get('/utilisateurs').then(r=>setUtilisateurs(r.data)) },[])
  return (
    <div>
      <h2>Utilisateurs</h2>
      <Link to="/utilisateurs/nouveau">+ Nouvel utilisateur</Link>
      <ul>
        {utilisateurs.map(u=>(
          <li key={u.id}>
            <Link to={`/utilisateurs/${u.id}`}>{u.identifiant}</Link> — {u.email || '—'} {u.actif ? '(actif)' : '(inactif)'}
          </li>
        ))}
      </ul>
    </div>
  )
}