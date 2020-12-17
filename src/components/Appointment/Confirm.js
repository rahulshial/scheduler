import React from 'react';
import Button from '../Button';

/** This React component shows the Confirm dialogue when 
 * the user tries to cancel an appointment.
 * called from Appointments component in /src/components/Appointment/index.js
 */
export default function Confirm(props) {
const {message, onConfirm, onCancel} = props;
  return(
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={onCancel}>Cancel</Button>
        <Button danger onClick={onConfirm}>Confirm</Button>
      </section>
    </main>
  );
};