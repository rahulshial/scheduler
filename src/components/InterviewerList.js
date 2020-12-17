import React from "react";
import InterviewerListItem from 'components/InterviewerListItem';
import 'components/InterviewerList.scss';

/** Renders the interviewer list for each appointment booked. */
export default function InterviewerList(props) {
  const {interviewers, value, onChange} = props;
  const interviewerListItem = interviewers.map((interviewerData, index) => {
    return (
    <InterviewerListItem 
    key={interviewerData.id} 
    name={interviewerData.name}
    avatar={interviewerData.avatar}
    selected={interviewerData.id === value}
    setInterviewer={event => onChange(interviewerData.id)} />)
  });

  return (
  <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {interviewerListItem}
  </ul>
  </section>
  );
};














  
  // const interviewerListItem = interviewers.map((interviewers, index) => {
  //   return 
  //   <InterviewerListItem 
  //     key={interviewers.id} 
  //     id={interviewers.id} 
  //     name={interviewers.name} 
  //     avatar={interviewers.avatar} 
  //     setInterviewer={setInterviewer} 
  //     selected={interviewers.id === interviewer}
  //   />
  // });

  // const interviewerListItem = interviewers.map((interviewerData, index) => {
  //   return (
  //   <InterviewerListItem 
  //   key={interviewerData.id} 
  //   name={interviewerData.name}
  //   avatar={interviewerData.avatar}
  //   selected={interviewerData.id === interviewer}
  //   setInterviewer={event => setInterviewer(interviewerData.id)} />)
  // });