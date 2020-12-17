
/** Selectors are used within the application to use the state data and return return the respective filtered data back to the applicaton component to render on screen. */

const getAppointmentsForDay = (state, day) => {
  const appointmentsArray = [];

  if (state.days.length !== 0) {
  const dayFor = state.days.find(dayArr => dayArr.name === day);
    if(dayFor) {
      for (const appt of dayFor.appointments) {
        appointmentsArray.push(state.appointments[appt]);
      };
    }
  }
  return appointmentsArray;
};

const getInterview = (state, interview) => {
  if (interview === null) {
    return null;
  };
  const returnObj = {
    student: interview.student,
    interviewer: {
      id: state.interviewers[interview.interviewer].id,
      name: state.interviewers[interview.interviewer].name,
      avatar: state.interviewers[interview.interviewer].avatar
    }
  };
  return returnObj;
};

const getInterviewersForDay = (state, day) => {
  const interviewersArray = [];

  if (state.days.length !== 0) {
  const dayFor = state.days.find(dayArr => dayArr.name === day);
    if(dayFor) {
      for (const interviewer of dayFor.interviewers) {
        interviewersArray.push(state.interviewers[interviewer]);
      };
    }
  }
  return interviewersArray;

};

export {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
};

