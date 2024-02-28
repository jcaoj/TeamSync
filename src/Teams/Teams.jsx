import React from "react";
import { FocusableElementsInCells as TeamsData} from "./TeamsData";
import "./Teams.css";

export default function Teams() {
  return (
      <div>
          <h1>Teams</h1>
          <TeamsData />
      </div>
  );
  }


// import React from "react";
// import { useState, useContext, useEffect } from "react";
// import { Context } from "../Context";

// export default function Teams(){
//     const { currentPage, setCurrentPage } = useContext(Context);

//     useEffect(() => {
//         console.log("use effect mounted teams")
//         // fetch('/getProjects')
//         // .then(res => console.log(res));
//         setCurrentPage("teams")
//       }, []);

//       return (
//         <p>Teams page</p>
//       )
// }