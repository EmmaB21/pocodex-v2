const LargeCardDisplay = ({ selectedCard, onClose }) => {

    if (!selectedCard) return null;
    
    return (
      <div className="large-card-display" onClick={onClose}>
        <img src={selectedCard.image} alt={selectedCard.name} />
        <button className="close-button" onClick={onClose}>X</button>
      </div>
    );
  };
  
  export default LargeCardDisplay;
  