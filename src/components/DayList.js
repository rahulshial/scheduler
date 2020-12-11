import React from "react";
import DayListItem from 'components/DayListItem';

export default function DayList({days, day, setDay}) {
  const dayListItem = days.map((dayData, index) => {
    return <DayListItem key={index} name={dayData.name} spots={dayData.spots} setDay={setDay} selected={dayData.name === day}/>
  });

  return (
    <ul>
      {dayListItem}
    </ul>
  );
};