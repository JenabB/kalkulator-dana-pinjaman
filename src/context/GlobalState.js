import React, { createContext, useReducer } from "react";

import Reducer from "./Reducer";

const initialState = {
  dana: 0,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  function getDana(value) {
    dispatch({
      type: "GET_DANA",
      payload: value,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        dana: state.dana,
        getDana,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
