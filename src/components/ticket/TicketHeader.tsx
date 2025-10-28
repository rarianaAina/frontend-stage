import React from "react";

type TicketHeaderProps = {
  reference: string;
  statut?: string | number | null;
  dateCreation?: string | null;
  produit?: string | null; 
  produitNom?: string | null;
  onRelancer: () => void;
  onAjouterPJ: () => void;
  onCloturer: () => void;
};

// Fonction getStatutInfo inchangée...
function getStatutInfo(raw: string | number | null | undefined) {
  const normalized = String(raw || "").trim().toUpperCase();

  const map: Record<string, { label: string; bg: string; color: string; border?: string }> = {
    OUVERT:     { label: "Ouvert",     bg: "#e6f7ff", color: "#006d75", border: "#91d5ff" },
    EN_COURS:   { label: "En cours",   bg: "#fffbe6", color: "#ad8b00", border: "#ffe58f" },
    EN_ATTENTE: { label: "En attente", bg: "#fff1f0", color: "#a8071a", border: "#ffa39e" },
    RESOLU:     { label: "Résolu",     bg: "#f6ffed", color: "#237804", border: "#b7eb8f" },
    CLOTURE:    { label: "Clôturé",    bg: "#f0f0f0", color: "#595959", border: "#d9d9d9" },
    ANNULE:     { label: "Annulé",     bg: "#fafafa", color: "#8c8c8c", border: "#e8e8e8" },
  };

  const numericMap: Record<string, keyof typeof map> = {
    "1": "OUVERT",
    "2": "EN_COURS",
    "3": "EN_ATTENTE",
    "4": "RESOLU",
    "5": "CLOTURE",
    "6": "ANNULE",
  };

  const key = map[normalized] ? normalized : numericMap[normalized] ?? "OUVERT";
  return map[key];
}

export const TicketHeader: React.FC<TicketHeaderProps> = ({
  reference,
  statut,
  dateCreation,
  produit,
  produitNom,
  onRelancer,
  onAjouterPJ,
  onCloturer,
}) => {
  const statutInfo = getStatutInfo(statut);

  const displayProduit = produitNom || produit || "—";

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return "—";
    }
  };

  const badgeStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 999,
    background: statutInfo.bg,
    color: statutInfo.color,
    fontWeight: 600,
    border: `1px solid ${statutInfo.border ?? "transparent"}`,
    fontSize: 12,
    letterSpacing: 0.2,
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "30px",
        marginBottom: "40px",
      }}
    >
      <div
        style={{
          background: "rgba(200, 240, 180, 0.7)",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <strong style={{ color: "#17a2b8" }}>Référence :</strong> {reference || "—"}
        </div>

        <div style={{ marginBottom: "15px", display: "flex", gap: 8, alignItems: "center" }}>
          <strong style={{ color: "#17a2b8" }}>Statut :</strong>
          <span style={badgeStyle}>{statutInfo.label}</span>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong style={{ color: "#17a2b8" }}>Date de soumission :</strong>{" "}
          {formatDate(dateCreation)}
        </div>

        <div>
          <strong style={{ color: "#17a2b8" }}>Produit :</strong> {displayProduit}
        </div>
      </div>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            color: "#17a2b8",
            textDecoration: "underline",
            marginBottom: "20px",
          }}
        >
          Actions supplémentaires
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        >
          <button 
            onClick={onRelancer} 
            className="btn-warning"
            style={{
              padding: '10px',
              borderRadius: '20px',
              border: 'none',
              background: '#ffc107',
              color: 'black',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Nouvelle interaction
          </button>
          <button
            onClick={onAjouterPJ}
            style={{
              padding: '10px',
              borderRadius: '20px',
              border: 'none',
              background: "#c8f7dc",
              color: "black",
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Rajouter PJ
          </button>
          <button style={{ 
            padding: '10px',
            borderRadius: '20px',
            border: 'none',
            background: "#ffd700", 
            color: "black",
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            Renvoyer une fiche
          </button>
          <button 
            onClick={onCloturer} 
            className="btn-primary"
            style={{
              padding: '10px',
              borderRadius: '20px',
              border: 'none',
              background: '#17a2b8',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Clôturer ticket
          </button>
        </div>
      </div>
    </div>
  );
};