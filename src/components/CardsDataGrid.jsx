import { DataGrid } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
import { useState } from 'react';

function CardsDataGrid({ cards }) {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    rarity: false,
    stage: false,
    suffix: false,
    abilities: false,
    description: false,
    weaknesses: false,
    resistances: false,
    set: false,
    setSymbol: false,
  });

  const renderList = (list, field) => (
    <div style={{ whiteSpace: 'normal', lineHeight: 1.2 }}>
      {Array.isArray(list) && list.length ? (
        list.map((item, i) => <div key={i}>- {item[field] || 'N/A'}</div>)
      ) : (
        <div>N/A</div>
      )}
    </div>
  );

  const rows = cards.map((card) => ({
    id: card.id,
    name: card.name,
    quantity: card.quantity,
    hp: card.hp,
    category: card.category,
    types:
      card.category === 'Dresseur'
        ? card.trainerType
        : card.types?.map((t) => t.type).join(', ') || 'N/A',
    evolveFrom: card.evolveFrom,
    attacks: card.attacks || [],
    effect: card.category === 'Dresseur' ? card.effect || 'N/A' : card.attacks || [],
    rarity: card.rarity,
    stage: card.stage,
    suffix: card.suffix || 'N/A',
    abilities: card.abilities
      ? card.abilities.map((a) => `${a.name} : ${a.effect}`).join(', ')
      : 'N/A',
    description: card.description,
    weaknesses: card.weaknesses
      ? card.weaknesses.map((w) => `${w.type} (${w.value})`).join(', ')
      : 'N/A',
    resistances: card.resistances
      ? card.resistances.map((r) => `${r.type} (${r.value})`).join(', ')
      : 'N/A',
    set: card.set?.name || 'N/A',
    setSymbol: card.set?.symbol || 'N/A',
  }));

  const columns = [
    { field: 'name', headerName: 'Nom', flex: 1, minWidth: 150 },
    { field: 'quantity', headerName: 'Qté', width: 50 },
    { field: 'hp', headerName: 'PV', width: 50 },
    { field: 'types', headerName: 'Types', flex: 1, minWidth: 100 },
    { field: 'evolveFrom', headerName: 'Évolution de', flex: 1, minWidth: 100 },

    {
      field: 'attacks',
      headerName: 'Attaques',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Tooltip
          title={
            Array.isArray(params.row.attacks) && params.row.attacks.length
              ? renderList(params.row.attacks, 'name')
              : 'N/A'
          }
        >
          <div className="multi-line">{renderList(params.row.attacks, 'name')}</div>
        </Tooltip>
      ),
    },
    {
      field: 'damage',
      headerName: 'Dégâts',
      flex: 1,
      maxWidth: 70,
      renderCell: (params) => (
        <Tooltip
          title={
            Array.isArray(params.row.attacks) && params.row.attacks.length
              ? renderList(params.row.attacks, 'damage')
              : 'N/A'
          }
        >
          <div className="multi-line">{renderList(params.row.attacks, 'damage')}</div>
        </Tooltip>
      ),
    },
    {
      field: 'effect',
      headerName: 'Effets',
      flex: 1.5,
      minWidth: 150,
      renderCell: (params) => {
        const isTrainer = params.row.category === 'Dresseur';
        const value = isTrainer ? params.row.effect : params.row.effect;

        return (
          <Tooltip
            title={
              isTrainer
                ? typeof value === 'string'
                  ? value
                  : 'N/A'
                : Array.isArray(value) && value.length
                ? renderList(value, 'effect')
                : 'N/A'
            }
          >
            <div className="multi-line">
              {isTrainer ? (
                <div style={{ whiteSpace: 'normal' }}>{value}</div>
              ) : (
                renderList(value, 'effect')
              )}
            </div>
          </Tooltip>
        );
      },
    },

    { field: 'rarity', headerName: 'Rareté', flex: 1, minWidth: 100 },
    { field: 'stage', headerName: 'Stade', flex: 1, minWidth: 80 },
    { field: 'suffix', headerName: 'Suffixe', flex: 1, maxWidth: 30 },
    { field: 'abilities', headerName: 'Talent', flex: 1, minWidth: 150 },
    { field: 'description', headerName: 'Description', flex: 1, minWidth: 150 },
    { field: 'weaknesses', headerName: 'Faiblesses', flex: 1, minWidth: 80 },
    { field: 'resistances', headerName: 'Résistances', flex: 1, minWidth: 80 },
    { field: 'set', headerName: 'Set', flex: 1, minWidth: 100 },
    {
      field: 'setSymbol',
      headerName: 'Symbole du Set',
      sortable: false,
      filterable: false,
      flex: 1,
      maxWidth: 60,
    },
  ];

  return (
    <div style={{ height: '95%', width: '100%' }}>
      <DataGrid
        rowHeight={60}
        rows={rows}
        columns={columns}
        showCellVerticalBorder
        showColumnVerticalBorder
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
      />
    </div>
  );
}

export default CardsDataGrid;

