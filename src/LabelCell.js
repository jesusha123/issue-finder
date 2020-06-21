import React from 'react';

function LabelCell(props) {
  const labelButtons = props.labels.map(l => 
    <button key={l.id} type="button" style={{ backgroundColor: '#'+l.color }}>{l.name}</button>
  );

  return (
      <td>{labelButtons}</td>
  );
}

export default LabelCell;
