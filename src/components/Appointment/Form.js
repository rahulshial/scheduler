import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

export default function Form(props) {
  const {interviewers, onSave, onCancel} = props;

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const cancel = () => {
   onCancel(reset());
  }

  const reset = () => {
    setName('');
    setInterviewer(null);
  }

  const save = () => {
    onSave(name, interviewer);
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => {setName(event.target.value)}}
          />
        </form>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  );
};