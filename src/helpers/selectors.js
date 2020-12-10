
export default function getAppointmentsForDay(state, day) {
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

