import { useState } from 'react';

export const useVerificationCode = (length: number = 4) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));

  const updateCode = (index: number, value: string): void => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus sur le champ suivant
      if (value && index < length - 1) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const resetCode = (): void => {
    setCode(Array(length).fill(''));
  };

  const getCodeString = (): string => {
    return code.join('');
  };

  return {
    code,
    updateCode,
    resetCode,
    getCodeString
  };
};