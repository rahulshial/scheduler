
export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const SET_SPOTS = "SET_SPOTS";

function remainingSpotForDay(day, appointments) {
  const spotsForDay = day.appointments;
  let availSpots = 0;
  spotsForDay.forEach((appId) => {
    if (!appointments[appId].interview) {
      availSpots++;
    }
  });
  return availSpots;
}
function showDaysWithSpots(days, appointments) {
  const showedDays = days.map((day) => ({
    ...day,
    spots: remainingSpotForDay(day, appointments)
  }));
  return showedDays;
;}

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state, day: action.day
      }
    case SET_APPLICATION_DATA:
      return { 
        ...state, 
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      }
    case SET_INTERVIEW:
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview,
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment,
      };
      const days = showDaysWithSpots(state.days, appointments);
  
      return {
        ...state, 
        days,
        appointments
      }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}