
const CardDetailsTable = ({ cards, onSort, sortField, sortOrder, selectedColumns }) => {

  // Fonction utilitaire pour formater l'objet variants
  const formatVariants = (variants) => {
    if (!variants) return "N/A";
    // Si variants est une chaîne JSON, on la parse
    let variantsObj = typeof variants === "string" ? JSON.parse(variants) : variants;
    // Filtrer les clés dont la valeur est true
    const trueKeys = Object.keys(variantsObj).filter(key => variantsObj[key]);
    // Capitaliser la première lettre de chaque clé
    const formatted = trueKeys.map(key => key.charAt(0).toUpperCase() + key.slice(1));
    // Retourner la chaîne jointe par des virgules
    return formatted.join(", ");
  };

  return (
    <div className="card-details-table">
      <table>
        <thead>
          <tr>
            {selectedColumns.includes("Nom") && (
              <th onClick={() => onSort("name")}>Nom</th>
            )}
            {selectedColumns.includes("Suffixe") && (
              <th onClick={() => onSort("suffix")}>Suffixe</th>)}
            {selectedColumns.includes("Quantité") && (
              <th onClick={() => onSort("quantity")}>Qté</th>
            )}
            {selectedColumns.includes("Rareté") && (
              <th onClick={() => onSort("rarity")}>Rareté</th>
            )}
            {selectedColumns.includes("Points de Vie") && (
              <th onClick={() => onSort("hp")}>PV</th>
            )}
            {selectedColumns.includes("Types") && (
              <th onClick={() => onSort("types")}>Types</th>
            )}
            {selectedColumns.includes("Stade") && (
              <th onClick={() => onSort("stage")}>Niveau</th>
            )}
            {selectedColumns.includes("Evolution de") && <th>Évol. de</th>}
            {selectedColumns.includes("Attaques") && <th>Attaques</th>}
            {selectedColumns.includes("Dégâts") && (
              <th onClick={() => onSort("damage")}>Dégâts</th>
            )}
            {selectedColumns.includes("Effets") && <th>Effets</th>}
            {selectedColumns.includes("Talent") && <th>Talent</th>}
            {selectedColumns.includes("Faiblesses") && <th>Faiblesses</th>}
            {selectedColumns.includes("Résistances") && <th>Résistances</th>}
            {selectedColumns.includes("Description") && <th>Description</th>}
            {selectedColumns.includes("Variants") && <th>Variants</th>}
            {selectedColumns.includes("Set") && (
              <th onClick={() => onSort("setName")}>Set</th>
            )}
            {/* On peut ajouter d'autres colonnes complémentaires ici */}
          </tr>
        </thead>

        <tbody>
          {cards.map((card) => (
            <tr
              key={card.id}
              id={`row-${card.id}`}
              className={`card-row ${card.category.toLowerCase()}`}
            >
              {selectedColumns.includes("Nom") && <td>{card.name}</td>}
              {selectedColumns.includes("Suffixe") && <td>{card.suffix || 'N/A'}</td>}
              {selectedColumns.includes("Quantité") && <td>{card.quantity || 'N/A'}</td>}
              {selectedColumns.includes("Rareté") && <td>{card.rarity || 'N/A'}</td>}
              {selectedColumns.includes("Points de Vie") && <td>{card.hp || 'N/A'}</td>}
              {selectedColumns.includes("Types") && (
                <td>
                  {card.category === 'Dresseur'
                    ? card.trainerType || 'N/A'
                    : card.types
                      ? card.types.map((t) => t.type).join(", ")
                      : 'N/A'}
                </td>
              )}
              {selectedColumns.includes("Stade") && <td>{card.stage || 'N/A'}</td>}
              {selectedColumns.includes("Evolution de") && (
                <td>{card.evolveFrom || 'N/A'}</td>
              )}
              {selectedColumns.includes("Attaques") && (
                <td>
                  {card.attacks
                    ? card.attacks.map((attack, i) => (
                      <div key={i}>{attack.name}</div>
                    ))
                    : 'N/A'}
                </td>
              )}
              {selectedColumns.includes("Dégâts") && (
                <td>
                  {card.attacks
                    ? card.attacks.map((attack, i) => (
                      <div key={i}>
                        {attack.damage !== null && attack.damage !== undefined
                          ? attack.damage
                          : 'N/A'}
                      </div>
                    ))
                    : 'N/A'}
                </td>
              )}
              {selectedColumns.includes("Effets") && (
                <td>
                  {card.category === 'Dresseur'
                    ? card.effect || 'N/A'
                    : card.attacks
                      ? card.attacks.map((a, i) => (
                        <div key={i}>{a.effect || 'N/A'}</div>
                      ))
                      : 'N/A'}
                </td>
              )}
              {selectedColumns.includes("Talent") && (
                <td>
                  {card.abilities
                    ? card.abilities.map((a, i) => (
                      <div key={i}>
                        {a.name} : {a.effect}
                      </div>
                    )) : 'N/A'}
                </td>)}
              {selectedColumns.includes("Faiblesses") && (
                <td>
                  {card.weaknesses
                    ? card.weaknesses.map((w, i) => (
                      <div key={i}>
                        {w.type} {w.value}
                      </div>
                    ))
                    : 'N/A'}
                </td>
              )}
              {selectedColumns.includes("Résistances") && (
                <td>
                  {card.resistances
                    ? card.resistances.map((r, i) => (
                      <div key={i}>
                        {r.type} {r.value}
                      </div>
                    ))
                    : 'N/A'}
                </td>
              )}
              {selectedColumns.includes("Description") && (
                <td>{card.description || 'N/A'}</td>
              )}
              {selectedColumns.includes("Variants") && (
                <td>{card.variants ? formatVariants(card.variants) : 'N/A'}</td>
              )}
              {selectedColumns.includes("Set") && <td>{card.set ? (
                <>
                  {card.set.name}{" "}
                  {card.set.symbol ? (
                    <img
                      src={`${card.set.symbol}.png`}
                      alt={`Symbole du set ${card.set.name}`}
                      style={{ width: "25px", marginLeft: "6px" }}
                    />
                  ) : null}
                </>
              ) : "N/A"}</td>}
              {/* On peut ajouter d'autres colonnes complémentaires en fonction de selectedColumns */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardDetailsTable;
