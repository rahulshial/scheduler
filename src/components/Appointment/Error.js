import React from 'react';

/** This component renders an error message if any during the Save / Cancel process 
 * called from Appointments component in /src/components/Appointment/index.js
*/
export default function Error(props) {
  const {message, onClose} = props;
  return(
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={onClose}
      />
    </main>
  );
};