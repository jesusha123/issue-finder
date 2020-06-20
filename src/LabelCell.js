import React from 'react';

function LabelCell(props) {
  const labelButtons = props.labels.map(l => 
    <button type="button">{l}</button>
  );

  return (
      <td>{labelButtons}</td>
  );
}

export default LabelCell;
