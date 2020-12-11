import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = ((newMode, replace) => {
    if(replace) {
      history.pop();
    }    
    history.push(newMode);
    setHistory(history);

    setMode(newMode);
  });

  const back = (() => {

    if (history.length >= 1) {
      history.pop();
      setMode(history[history.length-1]);
      setHistory(history);
    }
  })
  return {mode, transition, back};
};