import { useState } from 'react';
import axios from 'axios';

function AddCard({ onCardSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        // Effectuer une requête à l'API en filtrant par nom de carte
        const response = await axios.get(`https://api.tcgdex.net/v2/fr/cards?name=${searchTerm}`);
        const results = response.data; // Liste des cartes correspondantes à la recherche
        
        setFilteredCards(results);
      } catch (error) {
        console.error('Erreur lors de la recherche des cartes:', error);
      }
    } else {
      setFilteredCards([]); // Réinitialiser les résultats si le champ de recherche est vide
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Appelle la recherche lorsque "Entrée" est pressée
    }
  };

  const handleCardClick = async (cardId) => {
    const selectedCard = filteredCards.find(card => card.id === cardId);
    if (selectedCard) {
      const imageUrl = `${selectedCard.image}/high.png`;

      try {
        // Faire une requête à l'API pour obtenir les détails complets de la carte avec l'ID
        const response = await axios.get(`https://api.tcgdex.net/v2/fr/cards/${cardId}`);
        const cardData = response.data;  // Détails complets de la carte

        // Enregistrer la carte sélectionnée avec ses détails
        setSelectedCards(prev => [...prev, { ...selectedCard, image: imageUrl, details: cardData }]);

        // Passer tous les détails complets de la carte au parent
        onCardSelect(cardData);  // Passer l'objet complet à App.js
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la carte:', error);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nom de la carte"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown} // Écoute la touche "Entrée"
      />
      <button onClick={handleSearch}>Rechercher</button> {/* Bouton de recherche en option */}
      <div className="card-results">
        {filteredCards.map(card => (
        card.image ? (
          <img
            key={card.id}
            src={`${card.image}/high.png`}
            alt={card.name}
            onClick={() => handleCardClick(card.id)}
            style={{ width: '100px', margin: '10px', cursor: 'pointer' }}
          />
        ) : (
          <div className='card-placeholder'
            key={card.id}
            onClick={() => handleCardClick(card.id)}
          >
            <p>{card.name}</p>
            {card.id && <p>{card.id}</p>}
          </div>
        )
      ))}
      </div>

      <div className="selected-cards">
        {selectedCards.map(card => (
          <img
            key={card.id}
            src={card.image}
            alt={card.name}
            style={{ width: '50px', height: 'auto', margin: '5px' }}
          />
        ))}
      </div>
    </div>
  );
}

export default AddCard;
