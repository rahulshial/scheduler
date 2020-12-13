import { useEffect, useReducer } from 'react';
import axios from 'axios';

export default function useApplication() {  
  
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";
  
  const initialState = {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state, day: action.day
        }
      case SET_APPLICATION_DATA:
        return { 
          ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers
        }
      case SET_INTERVIEW: 
        return {
          ...state, appointments: action.appointments
      }
      case SET_SPOTS:
        let daysCopy = [...state.days];
        const dayToBeUpdated = daysCopy.find(day => day.appointments.includes(action.payload.id));
        dayToBeUpdated.spots += action.payload.diff;
        daysCopy = daysCopy.map(day => day.id === dayToBeUpdated.id ? dayToBeUpdated : day);
        return {
          ...state, days: daysCopy  
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }
  
  /** set state data */
  const setDay =(dayName) => {dispatch({ type: SET_DAY, day: dayName })};

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
        dispatch ({ 
          type: SET_APPLICATION_DATA, 
          days: all[0].data, 
          appointments: all[1].data, 
          interviewers: all[2].data 
        });
      });
  }, []);

  /** Function Declarations */

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

    const appointmentsByIdURL = `/api/appointments/${id}`;
    return axios.put(appointmentsByIdURL, {interview})
    .then(response => {
      if (response.status === 204) {
        dispatch({type: SET_INTERVIEW, appointments: appointmentsUpdated })
        dispatch({type: SET_SPOTS, payload:{id: id, diff: diff}})
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

    const diff = +1;
    
    const appointmentsByIdURL = `/api/appointments/${id}`;
    return axios.delete(appointmentsByIdURL)
    .then(response => {
      if (response.status === 204) {
        dispatch({type: SET_INTERVIEW, appointments: appointmentsUpdated })
        dispatch({type: SET_SPOTS, payload:{id: id, diff: diff}})
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
