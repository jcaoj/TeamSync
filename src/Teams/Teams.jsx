import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import TeamTable from "./TeamTable";
import CreateTeamModal from './CreateTeamModal';
import { Button, Title2 } from '@fluentui/react-components';
import { AddSquare16Regular } from "@fluentui/react-icons";
import axios from 'axios';

export default function Teams() {
  const { setCurrentPage, userId, teams, setTeams } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCurrentPage("teams");
  
    const fetchData = async () => {
      try {
        const teamResponse = await axios.get(`http://localhost:8081/getTeams?userId=${userId}`);
        setTeams(teamResponse.data);
      } catch (error) {
        console.error('Failed to fetch data: ', error);
      }
    };
  
    fetchData();
  }, [setCurrentPage, setTeams]);

  const handleCreateTeam = (newTeam) => {
    
    axios.post('http://localhost:8081/uploadTeam', newTeam)
    .then(res => {
      console.log(res);
      const addedTeam = { ...newTeam, id: res.data.Status.insertId };
      setTeams({ ...teams, [addedTeam.id]: addedTeam });
    })
    .catch(err => {
      console.error(err);
    });

  setIsModalOpen(false);

  };


  const teamsArray = teams ? Object.values(teams) : []; //DataGrid in TeamTable.jsx requires an array to render the table

  return (
    <div className="page">
      <div className="title">
        <Title2>Teams</Title2>
      </div>
      <TeamTable teams={teamsArray}/>
      <div className="createButton">
        <Button 
          icon={<AddSquare16Regular />} 
          appearance="primary" 
          onClick={() => setIsModalOpen(true)}
        >
          Create Team
        </Button>
      </div>
      {isModalOpen && <CreateTeamModal onCreate={handleCreateTeam} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
