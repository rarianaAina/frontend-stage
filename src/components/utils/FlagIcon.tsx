import React from 'react';

interface FlagIconProps {
  code: string;
  size?: number;
}

export const FlagIcon: React.FC<FlagIconProps> = ({ code, size = 16 }) => {
  const flags: { [key: string]: string } = {
    fr: '🇫🇷',
    en: '🇺🇸', 
    mg: '🇲🇬'
  };

  return (
    <span style={{ fontSize: `${size}px` }}>
      {flags[code] || '🏳️'}
    </span>
  );
};