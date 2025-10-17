import React, { useState } from 'react';

type Statut = 'Actif' | 'Inactif' | 'En attente';

const statuts: Statut[] = ['Actif', 'Inactif', 'En attente'];

const ModificationStatut: React.FC = () => {
    const [statut, setStatut] = useState<Statut>('Actif');
    const [message, setMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatut(e.target.value as Statut);
        setMessage('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Ici, vous pouvez ajouter la logique d'appel API pour modifier le statut
        setMessage(`Statut modifié avec succès : ${statut}`);
    };

    return (
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
            <h2>Modification du statut</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="statut-select">Nouveau statut :</label>
                <select
                    id="statut-select"
                    value={statut}
                    onChange={handleChange}
                    style={{ marginLeft: 8, marginBottom: 16 }}
                >
                    {statuts.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
                <br />
                <button type="submit">Modifier</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    );
};

export default ModificationStatut;