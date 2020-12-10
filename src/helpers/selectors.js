

const getAppointmentsForDay = function (state, day) {
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

const getInterview = function(state, interview) {
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

export {
  getAppointmentsForDay,
  getInterview,
};

