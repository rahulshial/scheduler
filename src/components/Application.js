import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import {getAppointmentsForDay} from '../helpers/selectors';
import "components/Application.scss";

export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  })
  const setDay = (day => setState({ ...state, day }));
  const dailyAppointments = getAppointmentsForDay(state, state.day)

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`;
    const interviewersURL = `/api/interviewers`;

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ])
      .then((all) => {
        console.log(all);
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
    }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu"><DayList 
            days={state.days}
            day={state.day}
            setDay={setDay}
            /></nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}

        {dailyAppointments.map(appointment => <Appointment key={appointment.id} {...appointment} />)}

      </section>
    </main>
  );
}
