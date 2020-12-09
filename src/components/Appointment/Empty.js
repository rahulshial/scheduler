import React from 'react';

export default function Empty({onAdd}) {

  // return <div className="appointment-empty">This is empty</div>
  return(
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd}
      />
    </main>
  );
};