import { useEffect, useReducer } from 'react';
import axios from 'axios';

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

/** This is a custom hook used to perform all db fetch, insert and update functions called.
 * It uses a reducer hook to manage the state of all days, day, appointments, interviews and interviewer.
*/

export default function useApplication() {  
 
  const initialState = {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  
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
    const appointmentsByIdURL = `/api/appointments/${id}`;
    return axios.put(appointmentsByIdURL, {interview})
    .then(response => {
      if (response.status === 204) {
        dispatch({type: SET_INTERVIEW, id, interview })
      }
    })
  };

  /** Deleting / Cancelling a set interview appointment */
  const cancelInterview = (id) => {    
    const appointmentsByIdURL = `/api/appointments/${id}`;
    return axios.delete(appointmentsByIdURL)
    .then(response => {
      if (response.status === 204) {
        dispatch({type: SET_INTERVIEW, id, interview: null })
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
