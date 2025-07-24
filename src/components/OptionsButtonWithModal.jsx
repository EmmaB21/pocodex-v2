import { useState, useEffect } from 'react';

function OptionsButtonWithModal({ viewMode, availableColumns, selectedColumns: parentSelectedColumns, onChangeSelectedColumns }) {


  // État pour contrôler l'affichage de la modale
  const [visible, setVisible] = useState(false);
  // État local pour la sélection des colonnes, initialisé avec la valeur du parent
  const [localSelectedColumns, setLocalSelectedColumns] = useState(parentSelectedColumns || []);
  

  // Met à jour la sélection locale si la prop change (utile si le parent modifie la sélection)
  useEffect(() => {
    setLocalSelectedColumns(parentSelectedColumns || []);
  }, [parentSelectedColumns]);

    // Ne s'affiche qu'en mode "table"
    if (viewMode !== "table") return null;

  const toggleModal = () => {
    setVisible(prev => !prev);
  };

  const handleOk = () => {
    onChangeSelectedColumns(localSelectedColumns);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCheckboxChange = (column) => {
    setLocalSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter(col => col !== column)
        : [...prev, column]
    );
  };

  return (
    <div className="options-button-container" style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={toggleModal}>Voir +</button>
      {visible && (
        <div className="custom-modal-overlay" onClick={handleCancel}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Ajouter des colonnes</h2>
            <div className="custom-modal-content">
              {availableColumns.map((column) => (
                <label key={column} className="custom-checkbox-label">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={localSelectedColumns.includes(column)}
                    onChange={() => handleCheckboxChange(column)}
                  />
                  {column}
                </label>
              ))}
            </div>
            <div className="custom-modal-actions">
              <button onClick={handleOk}>OK</button>
              <button onClick={handleCancel}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OptionsButtonWithModal;
