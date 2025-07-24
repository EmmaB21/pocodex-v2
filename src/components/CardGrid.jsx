import Card from "./Card";

const CardGrid = ({ displayedCards, emptySlots, onCardClick, onDeleteCard }) => {
    
    // Fonction pour gérer le clic droit
    const handleContextMenu = (event, card) => {
        event.preventDefault(); // Empêche le menu contextuel par défaut
        onDeleteCard(card); // Demande la suppression
    };

    return (
        <div className="mainSection_displayCard">
            {displayedCards.map((card, index) => (
                <Card
                    key={index}
                    id={`card-${card.id}`}
                    card={card}
                    onCardClick={onCardClick}
                    onContextMenu={handleContextMenu}
                />
            ))}
            {emptySlots.map((_, index) => (
                <div key={index} className="card-slot empty">
                    <p>Emplacement vide {index + 1}</p>
                </div>
            ))}
        </div>
    );
};

export default CardGrid;
