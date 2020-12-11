import React from "react";
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import {
  getAppointmentsForDay, 
  getInterview,
  getInterviewersForDay } from '../helpers/selectors';
import useApplicationData from '../hooks/useApplicationData';
import "components/Application.scss";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const appointmentsList = 
  getAppointmentsForDay(state, state.day)
  .map(appointment => (
    <Appointment 
      key={appointment.id} 
          {...appointment} 
          interview={getInterview(state, appointment.interview)}
          interviewers={getInterviewersForDay(state, state.day)}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
    />));

    /** Initial Screen Rendering */
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
        {/* Replace this with the schedule elements during the "The Scheduler" activity. */}

        {appointmentsList}

      </section>
    </main>
  );
}
