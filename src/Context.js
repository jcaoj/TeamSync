import React, { useState } from "react";
 
export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState("projects");
 
    return (
        <Context.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </Context.Provider>
    );
};