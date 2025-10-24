import React from "react";

type TicketHeaderProps = {
  reference: string;
  statut?: string | number | null;
  dateCreation?: string | null;
  produit: string;
  onRelancer: () => void;
  onAjouterPJ: () => void;
  onCloturer: () => void;
};

// Statut: map simple pour badges
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
  onRelancer,
  onAjouterPJ,
  onCloturer,
}) => {
  const statutInfo = getStatutInfo(statut);

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
          {dateCreation || "—"}
        </div>

        <div>
          <strong style={{ color: "#17a2b8" }}>Produit :</strong> {produit || "—"}
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
          <button onClick={onRelancer} className="btn-warning">
            Relancer
          </button>
          <button
            onClick={onAjouterPJ}
            style={{
              background: "#c8f7dc",
              color: "black",
            }}
          >
            Rajouter PJ
          </button>
          <button style={{ background: "#ffd700", color: "black" }}>
            Renvoyer une fiche
          </button>
          <button onClick={onCloturer} className="btn-primary">
            Clôturer ticket
          </button>
        </div>
      </div>
    </div>
  );
};
