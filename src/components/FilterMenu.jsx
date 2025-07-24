import { useState, useEffect, useCallback } from "react";

function FilterMenu({ onFilter, types, sets, activeDropdown, setActiveDropdown }) {
  const isDropdownVisible = activeDropdown === "filter";
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [setName, setSetName] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showSet, setShowSet] = useState(false);

  // Lorsque le bouton est cliqué, on bascule activeDropdown
  const toggleMenu = () => {
    setActiveDropdown(isDropdownVisible ? null : "filter");
  };

  // Fonction stabilisée pour éviter les boucles infinies
  const applyFilters = useCallback(() => {
    onFilter({ category, type, setName });
  }, [category, type, setName, onFilter]);

  // Appliquer le filtre dès qu'une option change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]); 

  // Réinitialiser les filtres
  const resetFilters = () => {
    setCategory("");
    setType("");
    setSetName("");
    onFilter({ category: "", type: "", setName: "" }); // Appliquer la réinitialisation
  };

  return (
    <div className="filter-menu-container">
      <button onClick={toggleMenu}>Filtres</button>
      {isDropdownVisible && (
        <div className="dropdown filter-dropdown">
          <div className="filter-menu">
            <div className="filter-item">
              <span className="filter-label" onClick={() => setShowCategory(!showCategory)}>Catégorie</span>
              {showCategory && (
                <select
                  className="filter-select"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setShowCategory(false);
                  }}
                >
                  <option value="">Tous</option>
                  <option value="Pokémon">Pokémon</option>
                  <option value="Dresseur">Dresseur</option>
                  <option value="Énergie">Énergie</option>
                </select>
              )}
            </div>
            <div className="filter-item">
              <span className="filter-label" onClick={() => setShowType(!showType)}>Type</span>
              {showType && (
                <select
                  className="filter-select"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setShowType(false);
                  }}
                >
                  <option value="">Tous</option>
                  {types.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="filter-item">
              <span className="filter-label" onClick={() => setShowSet(!showSet)}>Set</span>
              {showSet && (
                <select
                  className="filter-select"
                  value={setName}
                  onChange={(e) => {
                    setSetName(e.target.value);
                    setShowSet(false);
                  }}
                >
                  <option value="">Tous</option>
                  {sets.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              )}
            </div>
            <button onClick={resetFilters}>Réinitialiser</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterMenu;
