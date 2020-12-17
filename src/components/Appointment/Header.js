import React from 'react';

/**
 * Called from Appointments component in /src/components/Appointment/index.js
 */
export default function Header(props){

  const {time} = props;
  return(
    <header className="appointment__time">
      <h4 className="text--semi-bold">{time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
};