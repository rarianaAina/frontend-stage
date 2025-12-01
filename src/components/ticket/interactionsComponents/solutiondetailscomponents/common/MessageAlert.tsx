interface Props {
  error: string | null;
  success: string | null;
}

export default function MessageAlert({ error, success }: Props) {
  if (!error && !success) return null;

  return (
    <div style={{
      background: error ? '#fed7d7' : '#c6f6d5',
      color: error ? '#9b2c2c' : '#276749',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
      border: `1px solid ${error ? '#feb2b2' : '#9ae6b4'}`
    }}>
      {error || success}
    </div>
  );
}