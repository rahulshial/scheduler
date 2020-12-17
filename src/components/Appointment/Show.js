import React from 'react';

/** This component shows the appointments which have been set. This component is also called from 
 * src/components/Appointment/index.js on the Show mode. Index.js passes the appropriate props to
 * display the student name, interviwer with options to cancel or edit the appointment.
 */
export default function Show(props) {

  const {student, interviewer, onEdit, onDelete} = props;
  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{interviewer.name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={onEdit}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={onDelete}
          />
        </section>
      </section>
    </main>
  );
};