import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../lib/api'

type Utilisateur = { id:number; identifiant:string; nom?:string; prenom?:string; email?:string; actif:boolean }

export default function EditionUtilisateur(){
  const { id } = useParams();                 // id peut être undefined sur /utilisateurs/nouveau
  const estNouveau = !id;                     // <-- clé : création s’il n’y a PAS d’id
  const nav = useNavigate();

  const [u, setU] = useState<Utilisateur>({
    id: 0, identifiant: '', nom: '', prenom: '', email: '', actif: true
  });
  const [motDePasse, setMotDePasse] = useState('');

  useEffect(()=>{
    if(!estNouveau && id){                    // ne fetcher que si on édite
      api.get(`/utilisateurs/${id}`).then(r=>setU(r.data));
    }
  },[id, estNouveau]);

  const enregistrer = async ()=>{
    if(estNouveau){
      const payload: any = {
        identifiant: u.identifiant,
        nom: u.nom, prenom: u.prenom, email: u.email, actif: u.actif
      };
      if (motDePasse) payload.motDePasse = motDePasse;   // n’envoie pas la clé si vide
      await api.post('/utilisateurs', payload);
    } else {
      await api.put(`/utilisateurs/${id}`, {
        nom: u.nom, prenom: u.prenom, email: u.email, actif: u.actif
      });
      if (motDePasse){
        await api.post(`/utilisateurs/${id}/mot-de-passe`, { motDePasse });
      }
    }
    nav('/utilisateurs');
  }

  return (
    <div>
      <h2>{estNouveau ? 'Nouvel utilisateur' : 'Modifier utilisateur'}</h2>

      <div>
        <label>Identifiant</label>
        <input
          value={u.identifiant || ''}
          onChange={e=>setU({...u, identifiant:e.target.value})}
          disabled={!estNouveau}                 // actif en création, figé en édition
        />
      </div>

      <div><label>Nom</label>
        <input value={u.nom || ''} onChange={e=>setU({...u, nom:e.target.value})} />
      </div>

      <div><label>Prénom</label>
        <input value={u.prenom || ''} onChange={e=>setU({...u, prenom:e.target.value})} />
      </div>

      <div><label>Email</label>
        <input value={u.email || ''} onChange={e=>setU({...u, email:e.target.value})} />
      </div>

      <div><label>Actif</label>
        <input type="checkbox" checked={u.actif} onChange={e=>setU({...u, actif:e.target.checked})} />
      </div>

      <div>
        <label>Mot de passe {estNouveau ? '(initial)' : '(nouveau)'}</label>
        <input type="password" value={motDePasse} onChange={e=>setMotDePasse(e.target.value)} />
      </div>

      <button onClick={enregistrer}>Enregistrer</button>
    </div>
  );
}
