import React from 'react';

/** This is an empty appointment component. Users can book appointments from here
 * called from Appointments component in /src/components/Appointment/index.js
*/

export default function Empty(props) {
  const {onAdd} = props;

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