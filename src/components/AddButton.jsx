import AddCard from './AddCard';

function AddButton({ onCardSelect, activeDropdown, setActiveDropdown }) {

  const isDropdownVisible = activeDropdown === "add";
  const handleButtonClick = () => {
    // Si déjà ouvert, ferme le dropdown, sinon l'ouvre
    setActiveDropdown(isDropdownVisible ? null : "add");
  };

  return (
    <div className="menu-item">
      <button onClick={handleButtonClick}>Ajouter</button>
      {isDropdownVisible && (
        <div className="dropdown add-dropdown">
          <AddCard onCardSelect={onCardSelect} />
        </div>
      )}
    </div>
  );
}

export default AddButton;
