import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplication() {

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
    /** Create / Add a new appointment to the state and database */
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

  /** Deleting / Cancelling a set interview appointment */
  const cancelInterview = (id) => {
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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};
