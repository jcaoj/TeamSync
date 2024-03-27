import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../Context";
import axios from "axios";
import {
  Button,
  Title2,
  Text,
  Spinner,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  Subtitle2,
  Subtitle1,
} from "@fluentui/react-components";
import {
  ArrowLeft24Regular,
  Eye24Regular,
  Edit24Filled,
  AddSquare16Regular
} from "@fluentui/react-icons";
import '../Projects/ViewProject.css';
import "./Teams.css";
import UsersTable from "./UsersTable";
import CreateTeamModal from "./CreateTeamModal";

export default function ViewTeam() {
  const { setCurrentPage, teams } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [teamDetails, setTeamDetails] = useState();
  const [teamLoaded, setTeamLoaded] = useState(false);
  const [users, setUsers] = useState([])
  const [isEditTeam, setIsEditTeam] = useState(false)
  const [teamEdited, setTeamEdited] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTeam = (newTeam) => {
    axios.post('http://localhost:8081/uploadTeam', newTeam)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });

    setIsModalOpen(false);
  };

  function editTeam(team) {
    axios.post('http://localhost:8081/editTeam', team)
      .then(res => {
        console.log(res);
        setIsModalOpen(false);
        setTeamEdited(!teamEdited)
      })
      .catch(err => {
        console.error(err);
      });
  }

  function closeModal() {
    setIsModalOpen(false)
    setIsEditTeam(false)
  }
  useEffect(() => {
    setCurrentPage("teams");
    axios.get(`http://localhost:8081/getTeamById?teamId=${id}`)
      .then(res => {
        setTeamDetails(res.data[0]);
        setTeamLoaded(true);
      })
      .catch(err => console.log(err));

    axios.get(`http://localhost:8081/getUsersByTeamId?teamId=${id}`)
      .then(res => {
        setUsers(res.data);
        setTeamLoaded(true);
      })
      .catch(err => console.log(err));
  }, [id, setCurrentPage, teamEdited]);

  return (
    <>
      {teamLoaded ? (
        <div className="page-padding page">
          <Toolbar className="toolbar">
            <ToolbarButton
              aria-label="Back"
              appearance="subtle"
              size="small"
              icon={<ArrowLeft24Regular />}
              onClick={() => navigate("/teams")}
            />
            <ToolbarGroup>
              <ToolbarButton
                aria-label="Edit Team"
                appearance="subtle"
                icon={<Edit24Filled />}
                onClick={() => {
                  setIsEditTeam(true)
                  setIsModalOpen(true)
                }}
              />
            </ToolbarGroup>

          </Toolbar>

          <div className="responsive-two-column-grid">
            <div>
              <div className="title">
                <Title2>{teamDetails.name}</Title2> <br />
              </div>
              <div>
                <Subtitle1>Users</Subtitle1> <br /><br />
                <div className="usersTable">
                  <UsersTable users={users} teamId={id}></UsersTable>
                </div>
              </div>
            </div>
            <div>
              <div>
                <Subtitle2>Description</Subtitle2><br />
                <Text>{teamDetails.description}</Text> <br /><br />
                <Subtitle2>Created</Subtitle2><br />
                <Text>{String(teamDetails.created).replace("T", " ").slice(0, -5)} by {teamDetails.createdBy}</Text> <br />
              </div>
            </div>
          </div>
          <div className="createButton">
            <Button
              icon={<AddSquare16Regular />}
              appearance="primary"
              onClick={() => setIsModalOpen(true)}
            >
              Create Team
            </Button>
          </div>
          {isModalOpen && <CreateTeamModal onCreate={handleCreateTeam} onClose={closeModal} onEdit={editTeam}
            editTeam={isEditTeam ? teamDetails : null} editUsers={isEditTeam ? users : null} />}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
