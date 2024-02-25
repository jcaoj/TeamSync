import React from "react";
import { useState, useContext, useEffect } from "react";
import { Context } from "../Context";

export default function Teams(){
    const { currentPage, setCurrentPage } = useContext(Context);

    useEffect(() => {
        console.log("use effect mounted teams")
        // fetch('/getProjects')
        // .then(res => console.log(res));
        setCurrentPage("teams")
      }, []);

      return (
        <p>Teams page</p>
      )
}