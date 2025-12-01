import { useState } from 'react';
import NavBar from '../../components/common/NavBar';
import { useUserProfile } from '../../hooks/profile/useUserProfile';
import { useNotifications } from '../../hooks/profile/useNotifications';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { PersonalInfoForm } from '../../components/profile/PersonalInfoForm';
import { NotificationPreferences } from '../../components/profile/NotificationPreferences';
import { ProfileActions } from '../../components/profile/ProfileActions';
import { LoadingState } from '../../components/profile/LoadingState';
import { getStoredRole } from '../../hooks/role/utilsRole';

export default function Profile() {
  //const userRole = getStoredRole();
  const userRole = localStorage.getItem('role') || 'CLIENT';
  const userName = localStorage.getItem('userName') || 'Utilisateur';
  const userEmail = localStorage.getItem('email') || '';
  
  
  const {
    userData,
    setUserData,
    loading,
    saving,
    updateProfile,
    changePassword
  } = useUserProfile();

  const { notifications, setNotifications } = useNotifications();

  const handleUserDataChange = (field: keyof typeof userData, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile(userData);
      alert('Profil mis à jour avec succès!');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Une erreur est survenue');
    }
  };

  const handleChangePassword = async () => {
    const newPassword = prompt('Entrez votre nouveau mot de passe:');
    if (!newPassword) return;

    const confirmPassword = prompt('Confirmez votre nouveau mot de passe:');
    
    try {
      await changePassword(newPassword, confirmPassword);
      alert('Mot de passe changé avec succès!');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Une erreur est survenue');
    }
  };

  if (loading) {
    return <LoadingState userRole={userRole} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role={userRole} />

      <div style={{ padding: '40px 60px', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '42px',
          color: '#17a2b8',
          marginBottom: '30px',
          fontWeight: 'bold'
        }}>
          Mon Profil
        </h1>

        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <ProfileHeader 
            userName={userName}
            userEmail={userEmail}
            userRole={userRole}
          />

          <PersonalInfoForm 
            userData={userData}
            onUserDataChange={handleUserDataChange}
          />

          <NotificationPreferences 
            preferences={notifications}
            onPreferencesChange={setNotifications}
          />

          <ProfileActions 
            onSave={handleSaveProfile}
            onChangePassword={handleChangePassword}
            saving={saving}
          />
        </div>
      </div>
    </div>
  );
}