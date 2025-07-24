function ActiveFilterTokens({ filters }) {

  // On crée un tableau des filtres actifs (ceux dont la valeur n'est pas vide)
  const activeFilters = Object.entries(filters).filter(
    ([, value]) => value && value.trim() !== ''
  );

  if (activeFilters.length === 0) {
    return null; // Aucun filtre actif, rien à afficher
  }

  return (
    <div className="active-filter-tokens">
      {activeFilters.map(([key, value]) => (
        <span key={key} className="filter-token">
          {key} : {value}
        </span>
      ))}
    </div>
  );
}

export default ActiveFilterTokens;
