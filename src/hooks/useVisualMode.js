import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = ((newMode, replace) => {
    const newHistory = [...history];
    if(replace) {
      newHistory.pop();
    }    
    newHistory.push(newMode);
    setHistory(newHistory);

    setMode(newMode);
  });

  const back = (() => {
    const newHistory = [...history];
    if (history.length >= 1) {
      newHistory.pop();
      setMode(newHistory[newHistory.length-1]);
      setHistory(newHistory);
    }
  })
  return {mode, transition, back};
};