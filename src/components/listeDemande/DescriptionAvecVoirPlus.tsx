import { useState } from 'react';

interface DescriptionAvecVoirPlusProps {
  description: string;
  maxLength?: number;
}

export const DescriptionAvecVoirPlus = ({ 
  description, 
  maxLength = 100 
}: DescriptionAvecVoirPlusProps) => {
  const [voirPlus, setVoirPlus] = useState(false);
  
  if (!description) {
    return <span>-</span>;
  }

  const descriptionTronquee = description.length > maxLength 
    ? description.substring(0, maxLength) + '...' 
    : description;

  return (
    <div>
      <span style={{ 
        display: 'block',
        lineHeight: '1.4',
        wordBreak: 'break-word'
      }}>
        {voirPlus ? description : descriptionTronquee}
      </span>
      {description.length > maxLength && (
        <button
          onClick={() => setVoirPlus(!voirPlus)}
          style={{
            background: 'none',
            border: 'none',
            color: '#17a2b8',
            cursor: 'pointer',
            fontSize: '14px',
            padding: '4px 0',
            textDecoration: 'underline',
            fontWeight: '500'
          }}
        >
          {voirPlus ? 'Voir moins' : 'Voir plus'}
        </button>
      )}
    </div>
  );
};