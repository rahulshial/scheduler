// import { useState, useEffect, useReducer } from 'react';
import { useEffect, useReducer } from 'react';
import axios from 'axios';

export default function useApplication() {  
  
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  
  const initialState = {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.day, state.days, state.appointments, state.interviewers, "from Initial State thru reducer...**-*-*-*-");

  /** Declare the initial useState which is updated thruout execution */
  
  // const [state, setState] = useState({
  //   day: 'Monday',
  //   days: [],
  //   appointments: {},
  //   interviewers: {},
  // })


  function reducer(state, action) {
    console.log('Inside the reducer...', action);
    switch (action.type) {
      case SET_DAY:
        return {
          /* insert logic */
          ...state, day: action.day
        }
      case SET_APPLICATION_DATA:
        return { 
          /* insert logic */ 
          ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers
        }
      case SET_INTERVIEW: 
        return {
          /* insert logic */
          ...state, days: action.days, appointments: action.appointments
      }

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }
  


  /** set state data */
  // const setDay = (dayName => setState({ ...state, day: dayName }));

  const setDay =(dayName) => {dispatch({ type: SET_DAY, day: dayName })};

  // dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
  
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
        // setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
        dispatch ({ 
          type: SET_APPLICATION_DATA, 
          days: all[0].data, 
          appointments: all[1].data, 
          interviewers: all[2].data 
        });
      });
  }, []);

  /** Function Declarations */

  const updateSpotsForDay = (state, id, diff) => {
    const newDays = state.days.find(event => event.appointments.includes(id));
    console.log(`add: ${diff} **** newDays: ${newDays.id} **** spots: ${newDays.spots}`);
    newDays.spots += diff;
    console.log(`add: ${diff} **** newDays: ${newDays.id} **** spotsAfter: ${newDays.spots}`);
    const days = state.days.map(day => day.id === newDays.id ? newDays : day);
    return days;
  };

  const bookInterview = (id, interview) => {
    /** Create / Add a new appointment to the state and database */
    const appointmentUpdated = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    /** Update appointment in the state.appointments */
    const appointmentsUpdated = {
      ...state.appointments,
      [id]: appointmentUpdated
    };

    const diff = !state.appointments[id].interview ? -1 : 0;
    const daysUpdated = updateSpotsForDay(state, id, diff);

    const appointmentsByIdURL = `/api/appointments/${id}`;
    return axios.put(appointmentsByIdURL, {interview})
    .then(response => {
      if (response.status === 204) {
      //   setState(prev => ({
      //     ...prev,
      //     days: daysUpdated,
      //     appointments
      //   }));
      dispatch({type: SET_INTERVIEW, days: daysUpdated, appointments: appointmentsUpdated })
      }
    })
  };

  /** Deleting / Cancelling a set interview appointment */
  const cancelInterview = (id) => {
    /** nullify the appointment's interview data */
    const appointmentUpdated = {
      ...state.appointments[id],
      interview: null
    };
    
    /** Update appointment in the state.appointments */
    const appointmentsUpdated = {
      ...state.appointments,
      [id]: appointmentUpdated
    };
    const add = +1;
    const daysUpdated = updateSpotsForDay(state, id, add);

    const appointmentsByIdURL = `/api/appointments/${id}`;
    return axios.delete(appointmentsByIdURL)
    .then(response => {
      if (response.status === 204) {
        // setState(prev => ({
        //   ...prev,
        //   days: daysUpdated,
        //   appointments
        // }));
        dispatch({type: SET_INTERVIEW, days: daysUpdated, appointments: appointmentsUpdated })
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
