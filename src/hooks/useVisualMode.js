import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory((prev) => {
      const newHistory = [...prev];
      if (replace) {
        newHistory.pop();
      }
      newHistory.push(newMode);
      return newHistory;
    });
  };

  const back = () => {
    setHistory((prev) => {
      const newHistory = [...prev];
      if (newHistory.length < 2) {
        return prev;
      }
      newHistory.pop();
      setMode(newHistory[newHistory.length - 1]);
      return newHistory;
    });
  };

  return {mode, transition, back};
};

// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);
  // const transition = (newMode, replace = false) => {
  //   setMode(newMode);
  //   setHistory((prev) => {
  //     const newHistory = [...prev];
  //     if (replace) {
  //       newHistory.pop();
  //     }
  //     newHistory.push(newMode);
  //     return newHistory;
  //   });
  // };
  // const back = () => {
  //   setHistory((prev) => {
  //     const newHistory = [...prev];
  //     if (newHistory.length < 2) {
  //       return prev;
  //     }
  //     newHistory.pop();
  //     setMode(newHistory[newHistory.length - 1]);
  //     return newHistory;
  //   });
  // };
//   return { mode, transition, back };
// }