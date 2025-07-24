import { useState } from 'react';

const SearchButton = ({ cards, setHighlightedCard }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearch, setShowSearch] = useState(false);


    const scrollToCard = (cardName) => {
        const sanitizedId = `card-${cardName.replace(/\s+/g, "-").toLowerCase()}`;
        const cardElement = document.getElementById(sanitizedId);
        if (cardElement) {
            cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const handleSearch = () => {
        const filteredCards = cards.filter(card =>
            card.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filteredCards.length > 0) {
            const foundCard = filteredCards[0];
            setHighlightedCard(foundCard.name);
            scrollToCard(foundCard.name);

            setTimeout(() => setHighlightedCard(''), 5000);
        }
    };

    return (
        <div className="search-container">
            <button onClick={() => setShowSearch(!showSearch)}>
                🔍 Chercher une carte
            </button>

            {showSearch && (
                <div className="search-input">
                    <input
                        type="text"
                        placeholder="Chercher une carte..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                    <button onClick={handleSearch}>OK</button>
                </div>
            )}
        </div>
    );
};

export default SearchButton;