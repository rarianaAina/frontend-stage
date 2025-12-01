import { useAppTranslation } from '../../hooks/translation/useTranslation';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message }: LoadingStateProps) => {
  const { t } = useAppTranslation(['common']);

  return (
    <div style={{ 
      textAlign: 'center', 
      margin: '40px',
      background: 'white',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
    }}>
      {message || t('common:loading')}
    </div>
  );
};