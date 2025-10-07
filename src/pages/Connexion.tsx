// import { useState } from 'react'
// import { api } from '../lib/api'

// export default function Connexion(){
//   const [identifiant, setIdentifiant] = useState('')
//   const [motDePasse, setMotDePasse] = useState('')
//   const [msg, setMsg] = useState<string | null>(null)

//   const soumettre = async(e: React.FormEvent)=>{
//     e.preventDefault()
//     try{
//       const res = await api.post('/auth/connexion', { identifiant, motDePasse })
//       localStorage.setItem('jeton', res.data.jeton)
//       localStorage.setItem('identifiant', res.data.identifiant)
//       setMsg('Connecté')
//       window.location.href = '/'
//     } catch(err:any){
//       setMsg('Erreur de connexion')
//     }
//   }

//   return (
//     <form onSubmit={soumettre}>
//       <h2>Connexion</h2>
//       <div><input placeholder="Identifiant" value={identifiant} onChange={e=>setIdentifiant(e.target.value)} /></div>
//       <div><input placeholder="Mot de passe" type="password" value={motDePasse} onChange={e=>setMotDePasse(e.target.value)} /></div>
//       <button type="submit">Se connecter</button>
//       {msg && <p>{msg}</p>}
//     </form>
//   )
// }