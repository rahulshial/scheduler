import React from 'react';

/** This component renders the status while saving or cancelling the appointment.
 * Called from the Appointments component in /src/components/Appointment/index.js
 */
export default function Status(props) {
  const {message} = props;
  return(
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{message}</h1>
    </main>
  );
};