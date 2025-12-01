import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/common/NavBar';
import Modal from '../../components/Modal';
import FiltresUtilisateursComponent from '../../components/utilisateurs/FiltresUtilisateur';
import TableauUtilisateurs from '../../components/utilisateurs/TableauUtilisateur';
import FormulaireCreationUtilisateur from '../../components/utilisateurs/FormulaireCreationUtilisateur';
import ModalDetailsUtilisateur from '../../components/utilisateurs/ModalDetailsUtilisateur';
import type { Utilisateur, FiltresUtilisateurs, NouvelUtilisateur, UtilisateurPageReponse } from '../../types/utilisateur';
import { userService } from '../../services/userService';
import { useAppTranslation } from '../../hooks/translation/useTranslation';

export default function GestionUtilisateurs() {
  const navigate = useNavigate();
  const { t } = useAppTranslation(['common', 'users']);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Utilisateur | null>(null);
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageCourante: 0,
    totalPages: 0,
    totalElements: 0,
    taillePage: 20
  });

  const [filtres, setFiltres] = useState<FiltresUtilisateurs>({
    recherche: '',
    actif: '',
    dateDebut: '',
    dateFin: ''
  });

  const chargerUtilisateurs = async (page: number = 0) => {
    setLoading(true);
    try {
      const response: UtilisateurPageReponse = await userService.searchUtilisateurs({
        page,
        size: pagination.taillePage,
        ...filtres
      });
      
      setUtilisateurs(response.utilisateurs);
      setPagination({
        pageCourante: response.pageCourante,
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        taillePage: response.taillePage
      });
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chargerUtilisateurs(0);
  }, [filtres]);

  const handleCreateUser = async (nouvelUtilisateur: NouvelUtilisateur) => {
    try {
      await userService.createUser(nouvelUtilisateur);
      await chargerUtilisateurs(pagination.pageCourante);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    }
  };

  const handleShowDetails = (user: Utilisateur) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handlePageChange = (newPage: number) => {
    chargerUtilisateurs(newPage);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="ADMIN" />

      <div style={{ padding: '40px 60px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{ fontSize: '42px', color: '#17a2b8', fontWeight: 'bold' }}>
            {t('users:userList')} ({pagination.totalElements})
          </h1>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              background: '#6dd5ed',
              color: 'white',
              padding: '12px 28px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            {t('users:newUser')}
          </button>
        </div>

        <FiltresUtilisateursComponent 
          filtres={filtres} 
          onFiltresChange={setFiltres} 
        />

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            {t('common:loading')}
          </div>
        ) : (
          <>
            <TableauUtilisateurs 
              utilisateurs={utilisateurs}
              onVoirDetails={handleShowDetails}
            />
            
            {pagination.totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
                <button
                  onClick={() => handlePageChange(pagination.pageCourante - 1)}
                  disabled={pagination.pageCourante === 0}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1px solid #ddd',
                    background: pagination.pageCourante === 0 ? '#f3f4f6' : 'white',
                    cursor: pagination.pageCourante === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  {t('common:previous')}
                </button>
                
                <span style={{ padding: '8px 16px' }}>
                  {t('common:page')} {pagination.pageCourante + 1} {t('common:of')} {pagination.totalPages}
                </span>
                
                <button
                  onClick={() => handlePageChange(pagination.pageCourante + 1)}
                  disabled={pagination.pageCourante >= pagination.totalPages - 1}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1px solid #ddd',
                    background: pagination.pageCourante >= pagination.totalPages - 1 ? '#f3f4f6' : 'white',
                    cursor: pagination.pageCourante >= pagination.totalPages - 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  {t('common:next')}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title={t('users:createUser')}>
        <FormulaireCreationUtilisateur 
          onSubmit={handleCreateUser}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      <Modal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} title={t('users:userDetails')}>
        <ModalDetailsUtilisateur 
          utilisateur={selectedUser}
          onClose={() => setShowDetailsModal(false)}
        />
      </Modal>
    </div>
  );
}