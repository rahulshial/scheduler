import { useReducer } from 'react';

export default function useVisualMode(initial) {
  const TRANSITION = "TRANSITION";
  const BACK = "BACK";
  
  
  const initialState = {
    mode: '',
    history: []
  };

  /** This hook component uses reducer to manage the mode and it's history which is used from the 
   * Appointment component to render the appropriate screen to the user.  
   */
  
  const [state, dispatch] = useReducer(reducer, initialState);
  let mode = state.mode || initial;
  
  function reducer(state, action) {
    switch (action.type) {
      case TRANSITION:
        const transitionHistory = [...state.history];
        if(action.payload.replace === true) {
          transitionHistory.pop()
        }
        transitionHistory.push(action.payload.newMode);
        return {
          ...state, mode: action.payload.newMode, history: transitionHistory
        }
      case BACK:
        const backHistory = [...state.history];
        if (backHistory.length >= 1) {
          backHistory.pop();
        }
        const backMode = backHistory[backHistory.length - 1];
        return {
          ...state, mode: backMode, history: backHistory
        }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
  }
}

  const transition = (newMode, replace = false) => {
    dispatch({type: TRANSITION, payload:{newMode: newMode, replace: replace}})
  };

  const back = () => {
    dispatch({type: BACK})
  };

  return { mode, transition, back };
};
