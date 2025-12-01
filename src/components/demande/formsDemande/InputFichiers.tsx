interface InputFichiersProps {
  onChange: (fichiers: FileList | null) => void;
}

export const InputFichiers: React.FC<InputFichiersProps> = ({ onChange }) => {
  return (
    <div style={{ marginBottom: '25px' }}>
      <label style={{
        display: 'block',
        marginBottom: '10px',
        fontWeight: '600',
        color: '#333'
      }}>
        *Pièces jointes
      </label>
      <input
        type="file"
        multiple
        onChange={(e) => onChange(e.target.files)}
        style={{
          width: '100%',
          padding: '12px 18px',
          borderRadius: '20px',
          border: 'none',
          fontSize: '14px',
          background: 'white'
        }}
      />
      <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
        (PDF, DOCX, JPEG - 20 Mo max)
      </p>
    </div>
  );
};