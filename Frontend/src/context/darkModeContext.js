import { createContext, useEffect , useReducer } from "react";
import DarkModeReducer from "./darkModeReducer";

const INITIAL_STATE = {
  darkMode: false,
};
export const DarkModeContext = createContext(INITIAL_STATE);
export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);
  useEffect(() => {
      let mode = localStorage.getItem("darkMode");
      if(mode ==='true'){
        dispatch({ type: "DARK" });
      }
      else
      {
        dispatch({ type: "LIGHT" });
      }
  }, [])
  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
