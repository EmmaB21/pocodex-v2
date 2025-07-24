

function Card({ id, card, onCardClick, onContextMenu }) {
  
  return (
    <div
      id={id}
      className="card-slot"
      onClick={() => onCardClick(card)}
      onContextMenu={(event) => {
        if (onContextMenu) {
          event.preventDefault(); // Empêche le menu contextuel par défaut
          onContextMenu(event, card); // Appelle la fonction passée en prop
        }
      }}>
      <div className="card-count">x{card.quantity}</div>
      <img src={`${card.image}/high.png`} alt={`Carte ${card.name}`} />
    </div>
  );
}


export default Card;
