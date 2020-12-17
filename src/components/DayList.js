import React from "react";
import DayListItem from 'components/DayListItem';

/** This component gets the props of Days, Dayselected, and a function setDay thru the Application
 * component. It pases the Days information which contains the appointments and interviewers available
 * to the DayListItem component to render each appointment.
 */
export default function DayList(props) {
  const {days, day, setDay} = props;
  const dayListItem = days.map((dayData, index) => {
    return <DayListItem key={index} name={dayData.name} spots={dayData.spots} setDay={setDay} selected={dayData.name === day}/>
  });

  return (
    <ul>
      {dayListItem}
    </ul>
  );
};