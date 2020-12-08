import React from "react";
import classnames from 'classnames';
import 'components/DayListItem.scss';

export default function DayListItem({name, spots, setDay, selected}) {
  const dayClass = 'day-list__item day-list__item' + classnames({
    "--selected": selected,
    "--full": spots === 0
  });

  console.log(dayClass, 'dayclass *-*-*-*-*-*-');
  
  const onClick = () => {
    if(setDay) {
      setDay(name)
    }
  };

  if(spots === 0) {
    spots = 'no spots remaining';
  } else if (spots === 1) {
    spots = '1 spot remaining';
  } else if(spots > 1) {
    spots += ' spots remaining';
  };

  return (
    <li className={dayClass} onClick={onClick}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{spots}</h3>
    </li>
  );
};