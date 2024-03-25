//global states goes here
//number of unreadmessages = global state: since only having one context>put everything in one context GlobalContext(otherwise seperate context)

"use client";
import { useState, useContext, createContext } from "react";

const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  //count of unreadmessages
  //since count needed to be updated immediately in frotend when "mark as read" button is clicked,so 2 component needed to access the state count>so use context
  const [count, setCount] = useState(0);
  return (
    <GlobalContext.Provider value={{ count, setCount }}>
      {children}
    </GlobalContext.Provider>
  );
};
//custom hook for using globalcontext
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
