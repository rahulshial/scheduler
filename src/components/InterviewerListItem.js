import React from "react";
import classnames from 'classnames';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem({name, avatar, selected, setInterviewer}) {

  const interviewersClass = classnames('interviewers__item', {
    "interviewers__item--selected": selected,
  });

  // const onClick = () => {
  //   if(setInterviewer) {
  //     setInterviewer(id)
  //   }
  // };

  return (
  
  <li className={interviewersClass} onClick={setInterviewer}>
  {/* // <li className={interviewersClass} onClick={onClick}> */}
    <img
      className="interviewers__item-image"
      src={avatar}
      alt={name}
    />
    {selected && name}
  </li>
  );
};