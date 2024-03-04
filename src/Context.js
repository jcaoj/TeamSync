import React, { useState } from "react";
 
export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    const [statuses, setStatuses] = useState([]);
    const [teams, setTeams] = useState();
 
    return (
        <Context.Provider value={{statuses, setStatuses, teams, setTeams}}>
            {children}
        </Context.Provider>
    );
};