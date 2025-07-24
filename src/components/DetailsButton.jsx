function DetailsButton({ onShowDetails, viewMode }) {

  return <button onClick={onShowDetails}>{viewMode === "grid" ? "Voir Liste détaillée" : "Voir Cartes"}</button>;
}

export default DetailsButton;
