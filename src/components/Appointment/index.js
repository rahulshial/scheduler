import React from "react";
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from '../../hooks/useVisualMode'

/** This is the actual Appointment component which allows the user to navigate thru the
 * different appointments set for a single day. This component is called out during the initial load of the application, which fetches data from the server/db to render all the days and their respective appointment slots.
 * As the user navigates to Add, Edit, Cancel the appointments the modes are set thru the useVisualMode hook which when returned back allows this component to render the appropriate component.
 */
export default function Appointment(props) {
  
  const {id, time, interview, interviewers, bookInterview, cancelInterview} = props;

  /** Mode declarations */
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETE = 'DELETE';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';
  
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  /** Function declarations */

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition('SAVING');
    bookInterview(id, interview)
    .then(response => {
      transition('SHOW');
    })
    .catch(error => {
      transition('ERROR_SAVE', true);
    })
  }

  const deleteAppt = () => {
    transition('DELETE', true);
    cancelInterview(id)
    .then(response => {
      transition('EMPTY');
    })
    .catch(error => {
      transition('ERROR_DELETE', true);
    })
  }

  /** Rendering logic */
  return(
    <article className="appointment" data-testid="appointment">

      <Header time={time} />
      {mode === EMPTY && (
        <Empty 
          onAdd={() => {transition('CREATE')}}
        />)}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => {transition('CONFIRM')}}
          onEdit={() => {transition('EDIT')}}
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
          message="Delete the appointment?"
          onCancel={() => {back()}}
          onConfirm={deleteAppt}
        />
      )}
        {mode === CREATE && (
        <Form 
          interviewers={interviewers} 
          onCancel={() => {transition('EMPTY')}}
          onSave={save}
        />)}
        {mode === EDIT && (
        <Form
          name={interview.student}
          interviewers={interviewers}
          interviewer={interview.interviewer.id}
          onCancel={() => {back()}}
          onSave={save}
        />)}
      {mode === SAVING && (
        <Status 
            message='Saving'
        />
      )}
      {mode === DELETE && (
        <Status 
            message='Cancelling Appointment'
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
            message='Could not save appointment'
            onClose={() => {back()}}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
            message='Could not cancel appointment'
            onClose={() => {back()}}
        />
      )}

    </article>
  );
}