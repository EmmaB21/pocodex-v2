import SearchButton from "./SearchButton";
import { useState } from "react";

const AsideList = ({ cards, onCardClick, onQuantityChange, onDeleteCard, onRowClick }) => {

  const [showStats, setShowStats] = useState(false);
  const [highlightedCard, setHighlightedCard] = useState('');


  // Fonction pour gérer le clic droit
  const handleContextMenu = (event, card) => {
    event.preventDefault(); // Empêche le menu contextuel par défaut
    onDeleteCard(card); // Demande la suppression
  };

  // Statistiques
  const totalCards = cards.reduce((sum, card) => sum + (card.quantity || 1), 0);
  const uniqueCards = cards.length;
  const duplicates = totalCards - uniqueCards;
  const pokemons = cards.filter(card => card.category === "Pokémon").length;
  const energies = cards.filter(card => card.category === "Énergie").length;
  const trainers = cards.filter(card => card.category === "Dresseur").length;

  return (
    <aside className="mainSection_aside">
      <div className="aside-header">
        <h2>Mes {cards.length} cartes</h2>
        <button
          className="dropdown-toggle"
          onClick={() => setShowStats(!showStats)}
          aria-label="Afficher les statistiques"
        >
          {showStats ? "▲" : "▼"}
        </button>
      </div>

      {showStats && (
        <ul className="stats-dropdown">
          <li>Total cartes (avec doublons) : {totalCards}</li>
          <li>Cartes uniques : {uniqueCards}</li>
          <li>Doublons : {duplicates}</li>
          <li>Pokémons : {pokemons}</li>
          <li>Pokémons de base : {pokemons - cards.filter(card => card.stage === 'De base').length}</li>
          <li>Pokémons de niveau 1 : {cards.filter(card => card.stage === 'Niveau 1').length}</li>
          <li>Pokémons de niveau 2 : {cards.filter(card => card.stage === 'Niveau 2').length}</li>
          <li>Dresseurs/Objets : {trainers}</li>
          <li>Énergies : {energies}</li>
        </ul>
      )}
      <SearchButton cards={cards} setHighlightedCard={setHighlightedCard} />
      <ul>
        {/* Section Pokémon */}
        <h3>Pokémons</h3>
        {cards
          .filter(card => card.category === 'Pokémon')
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(card => (
            <li 
            key={card.id} 
            id={`card-${card.name.replace(/\s+/g, "-").toLowerCase()}`}
            className={highlightedCard === card.name ? 'highlighted' : ''}
              onClick={() => {
                onCardClick(card.id);
                onRowClick(card.id);
              }} onContextMenu={(e) => handleContextMenu(e, card)}>
              <p>{card.name}</p>
              <p className="quantity">
                x<button className="quantity-buttons" onClick={(e) => { e.stopPropagation(); onQuantityChange(card.id, -1); }}>-</button> {card.quantity || 1}
                <button className="quantity-buttons" onClick={(e) => { e.stopPropagation(); onQuantityChange(card.id, +1); }}>+</button>
              </p>
              <p>{card.types?.map(type => type.type).join(', ')}</p>
              <p>PV: {card.hp}</p>
            </li>
          ))}

        {/* Section Dresseur */}
        <h3>Dresseurs</h3>
        {cards
          .filter(card => card.category === 'Dresseur')
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(card => (
            <li 
            key={card.id} 
            id={`card-${card.name.replace(/\s+/g, "-").toLowerCase()}`}
            className={highlightedCard === card.name ? 'highlighted' : ''}
              onClick={() => {
                onCardClick(card.id);
                onRowClick(card.id);
              }} onContextMenu={(e) => handleContextMenu(e, card)}>
              <p>{card.name}</p>
              <p className="quantity">
                x<button className="quantity-buttons" onClick={(e) => { e.stopPropagation(); onQuantityChange(card.id, -1); }}>-</button> {card.quantity || 1}
                <button className="quantity-buttons" onClick={(e) => { e.stopPropagation(); onQuantityChange(card.id, +1); }}>+</button>
              </p>
              <p>{card.trainerType}</p>
            </li>
          ))}

        {/* Section Énergie */}
        <h3>Énergies</h3>
        {cards
          .filter(card => card.category === 'Énergie')
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(card => (
            <li 
            key={card.id} 
            id={`card-${card.name.replace(/\s+/g, "-").toLowerCase()}`}
            className={highlightedCard === card.name ? 'highlighted' : ''}
              onClick={() => {
                onCardClick(card.id);
                onRowClick(card.id);
              }} onContextMenu={(e) => handleContextMenu(e, card)}>
              <p>{card.name}</p>
              <p className="quantity">
                x<button className="quantity-buttons" onClick={(e) => { e.stopPropagation(); onQuantityChange(card.id, -1); }}>-</button> {card.quantity || 1}
                <button className="quantity-buttons" onClick={(e) => { e.stopPropagation(); onQuantityChange(card.id, +1); }}>+</button>
              </p>
              <p>{card.energyType}</p>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default AsideList;
