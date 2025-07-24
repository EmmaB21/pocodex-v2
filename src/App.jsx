import './App.css';
import { baseURL } from './API';
import Header from './components/Header';
import NavigationArrows from './components/NavigationArrows';
import AsideList from './components/AsideList';
import CardGrid from './components/CardGrid';
import LargeCardDisplay from './components/LargeCardDisplay';
import ConfirmationModal from './components/ConfirmationModal';
import CardDetailsTable from './components/CardDetailsTable';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';


function App() {
  // États principaux
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    setName: '',
  });

  // Colonnes actuellement sélectionnées pour affichage complémentaire
  const [selectedColumns, setSelectedColumns] = useState(["Nom", "Quantité", "Rareté", "Points de Vie", "Types", "Stade", "Evolution de", "Attaques", "Dégâts", "Effets"]);

  // Gestion des colonnes complémentaires
  const availableColumns = [
    "Suffixe", "Talent",
    "Description", "Faiblesses",
    "Résistances", "Variants", "Set"
  ];

  // Nombre de cartes par page pour la pagination
  const cardsPerPage = 8;

  // Chargement initial des cartes
  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/cards`);
      setCards(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des cartes :', error);
    }
  };

  // Fonction pour basculer entre la vue grille et la vue tableau
  const toggleView = () => {
    setViewMode((prev) => (prev === "grid" ? "table" : "grid"));
  };

  // Fonction pour sauvegarder une carte dans la base de données
  const saveCardToDatabase = async (cardData) => {
    try {
      await axios.post(`${baseURL}/api/cards`, cardData);
      fetchCards();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la carte :', error);
    }
  };

  const handleCardSelect = (cardData) => {
    saveCardToDatabase(cardData);
  };

  // Fonction pour gérer le clic sur une carte dans la grille
  const handleCardClick = (card) => {
    setSelectedCard({
      ...card,
      image: `${card.image}/high.png`,
    });
  };

  // Fonction pour fermer la carte sélectionnée
  const handleCloseLargeCard = () => {
    setSelectedCard(null);
  };

  // Fonction pour obtenir la page d'une carte spécifique
  const getPageOfCard = (cardId) => {
    const cardIndex = cards.findIndex((card) => card.id === cardId);
    return Math.floor(cardIndex / cardsPerPage);
  };

  // Fonction pour faire défiler vers une carte spécifique
  const scrollToCard = (cardId) => {
    const targetPage = getPageOfCard(cardId);
    if (targetPage !== currentPage) {
      setCurrentPage(targetPage);
    }
    setTimeout(() => {
      const cardElement = document.getElementById(`card-${cardId}`);
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
        cardElement.classList.add("highlight");
        setTimeout(() => cardElement.classList.remove("highlight"), 2000);
      }
    }, 100);
  };

  // Fonction pour gérer le clic sur une carte dans la liste latérale
  const handleCardClickInAside = (cardId) => {
    scrollToCard(cardId);
  };

  // Fonction pour faire défiler vers la ligne du tableau correspondante
  const scrollToTableRow = (cardId) => {
    const rowElement = document.getElementById(`row-${cardId}`);
    if (rowElement) {
      rowElement.scrollIntoView({ behavior: "smooth", block: "center" });
      rowElement.classList.add("highlight-row");
      setTimeout(() => rowElement.classList.remove("highlight-row"), 2000);
    }
  };

  // Fonction pour gérer le clic sur une ligne du tableau dans la liste latérale
  const handleRowClickInAside = (cardId) => {
    if (viewMode === "table") {
      scrollToTableRow(cardId);
    }
  };

  // Fonction pour gérer le changement de quantité d'une carte
  const handleQuantityChange = async (cardId, delta) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId
          ? { ...card, quantity: Math.max(1, (card.quantity || 1) + delta) }
          : card
      )
    );
    const updatedCard = cards.find((card) => card.id === cardId);
    const newQuantity = Math.max(1, (updatedCard ? updatedCard.quantity : 1) + delta);
    try {
      await axios.patch(`${baseURL}/api/cards/${cardId}`, { quantity: newQuantity });
      fetchCards();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la quantité :", error);
    }
  };

  // Fonction pour demander la suppression d'une carte
  const requestDeleteCard = (card) => {
    setCardToDelete(card);
    setModalVisible(true);
  };

  const confirmDeleteCard = async () => {
    if (cardToDelete) {
      try {
        await axios.delete(`${baseURL}/api/cards/${cardToDelete.id}`);
        fetchCards();
        setModalVisible(false);
        setCardToDelete(null);
      } catch (error) {
        console.error('Erreur lors de la suppression de la carte :', error);
        setModalVisible(false);
        setCardToDelete(null);
      }
    }
  };

  const cancelDeleteCard = () => {
    setModalVisible(false);
    setCardToDelete(null);
  };

  // Fonction pour trier les cartes
  // Tri par défaut : par nom
  const onSort = (field) => {
    if (sortField === field) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Fonction utilitaire pour obtenir les dégâts maximum d'une carte
  const getMaxDamage = (card) => {
    if (card.attacks && card.attacks.length > 0) {
      const damages = card.attacks.map((attack) => {
        const dmg = parseInt(attack.damage, 10);
        return isNaN(dmg) ? 0 : dmg;
      });
      return Math.max(...damages);
    }
    return 0;
  };

  // Fonction pour gérer le filtrage des cartes
  const handleFilter = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // --- Filtrage ---
  const filteredCards = cards.filter((card) => {
    return (
      (filters.category === '' || card.category === filters.category) &&
      (filters.type === '' ||
        (card.types && card.types.some((t) => t.type === filters.type))) &&
      (filters.setName === '' || (card.set && card.set.name === filters.setName))
    );
  });

  // --- Tri sur le tableau filtré ---
  const sortedCards = [...filteredCards].sort((a, b) => {
    if (!sortField) return 0;
    let aValue, bValue;
    if (sortField === "types") {
      aValue = a.types ? a.types.map(t => t.type).join(", ") : "";
      bValue = b.types ? b.types.map(t => t.type).join(", ") : "";
    } else if (sortField === "damage") {
      aValue = getMaxDamage(a);
      bValue = getMaxDamage(b);
    } else if (sortField === "setName") {
      aValue = a.set ? a.set.name : "";
      bValue = b.set ? b.set.name : "";
    } else {
      aValue = a[sortField] || "";
      bValue = b[sortField] || "";
    }
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return sortOrder === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    }
  });

  // --- Pagination (basée sur filteredCards) ---
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const displayedCards = filteredCards.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );
  const emptySlots = displayedCards.length < cardsPerPage
    ? Array(cardsPerPage - displayedCards.length).fill(null)
    : [];

  // --- Gestion des flèches de navigation ---
  const handlePrevious = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  return (
    <div className="app">
      <div className="app_loader">
        <p>POCODEX</p>
      </div>
      <Header
        onFilter={handleFilter}
        onCardSelect={handleCardSelect}
        onToggleView={toggleView}
        viewMode={viewMode}
        types={Array.from(new Set(cards.flatMap(card => card.types ? card.types.map(t => t.type) : [])))}
        sets={Array.from(new Set(cards.map(card => card.set && card.set.name).filter(Boolean)))}
        availableColumns={availableColumns}
        selectedColumns={selectedColumns}
        onChangeSelectedColumns={setSelectedColumns}
        filters={filters}
      />
      <section className="app_mainSection">
        <AsideList
          cards={cards}
          onCardClick={handleCardClickInAside}
          onQuantityChange={handleQuantityChange}
          onDeleteCard={requestDeleteCard}
          onRowClick={handleRowClickInAside}
        />
        <div className="mainSection_navigationAndCards">
          {viewMode === "grid" && (
            <NavigationArrows onPrevious={handlePrevious} onNext={handleNext} />
          )}
          {viewMode === "grid" ? (
            <CardGrid
              displayedCards={displayedCards}
              emptySlots={emptySlots}
              onCardClick={handleCardClick}
              onDeleteCard={requestDeleteCard}
            />
          ) : (
            <CardDetailsTable
              cards={sortedCards}
              onSort={onSort}
              sortField={sortField}
              sortOrder={sortOrder}
              selectedColumns={selectedColumns}
            />
          )}
        </div>
        <LargeCardDisplay selectedCard={selectedCard} onClose={handleCloseLargeCard} />
        {modalVisible && (
          <ConfirmationModal
            message={`Voulez-vous vraiment supprimer toutes les copies de "${cardToDelete.name}" ?`}
            onConfirm={confirmDeleteCard}
            onCancel={cancelDeleteCard}
          />
        )}
      </section>
    </div>
  );
}

export default App;
