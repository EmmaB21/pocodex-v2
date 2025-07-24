import FilterMenu from "./FilterMenu";
import AddButton from "./AddButton";
import DetailsButton from "./DetailsButton";
import OptionsButtonWithModal from "./OptionsButtonWithModal";
import ActiveFilterTokens from "./ActiveFilterTokens";
import { useState } from "react";

function Header({ onCardSelect, onToggleView, viewMode, onFilter, types, sets, availableColumns, selectedColumns, onChangeSelectedColumns, filters}) {

  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <header className="app_header">
      <p className="header_title">POCODEX - Le Pokedex de Colinou</p>
      <div className="header_menu-ctn">
      <div className="header_menu">
        <AddButton onCardSelect={onCardSelect} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown}/>
        <DetailsButton onShowDetails={onToggleView} viewMode={viewMode} />
        <FilterMenu onFilter={onFilter} types={types} sets={sets} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown}/>
        <OptionsButtonWithModal
          viewMode={viewMode}
          availableColumns={availableColumns}
          selectedColumns={selectedColumns}
          onChangeSelectedColumns={onChangeSelectedColumns}
        />
      </div>
      <div className="header_menu-tokens">
      <ActiveFilterTokens filters={filters} />
      </div>
      </div>
    </header>
  );
}

export default Header;
