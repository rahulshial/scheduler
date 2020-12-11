import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import {
  getAppointmentsForDay, 
  getInterview,
  getInterviewersForDay } from '../helpers/selectors';

import "components/Application.scss";

export default function Application(props) {

  /** Declare the initial useState which is updated thruout execution */
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  })
  
  /** set state data */
  const setDay = (day => setState({ ...state, day }));



  /** Fetch all the data form the DB and load to state */
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

    /** Function Declarations */
    const bookInterview = (id, interview) => {

      /** Create the appointment */
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      /** Update appointment in the state.appointments */
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      const appointmentsByIdURL = `/api/appointments/${id}`;

      console.log("Updating interview in database...")

      return axios.put(appointmentsByIdURL, {interview})
      .then(response => {
        if (response.status === 204) {
          setState({
            ...state,
            appointments
          });          
        }
      })
    };

    const cancelInterview = (id) => {

      console.log(`In Application.js - id = ${id}`);
      /** nullify the appointment's interview data */
      const appointment = {
        ...state.appointments[id],
        interview: null
      };

      /** Update appointment in the state.appointments */
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      console.log(`DELETING appointment: ${id} in database...`)

      const appointmentsByIdURL = `/api/appointments/${id}`;
      return axios.delete(appointmentsByIdURL)
      .then(response => {
        if (response.status === 204) {
          setState({
            ...state,
            appointments
          });          
        }
      })
    };

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
