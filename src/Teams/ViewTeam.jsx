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
} from "@fluentui/react-icons";
import '../Projects/ViewProject.css';

export default function ViewTeam() {
  const { setCurrentPage, teams } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [teamDetails, setTeamDetails] = useState();
  const [teamLoaded, setTeamLoaded] = useState(false);

  useEffect(() => {
    setCurrentPage("teams");
    axios.get(`http://localhost:8081/getTeamById?teamId=${id}`)
      .then(res => {
        setTeamDetails(res.data[0]);
        setTeamLoaded(true);
      })
      .catch(err => console.log(err));
  }, [id, setCurrentPage]);

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
                    aria-label="Edit Project"
                    appearance="subtle"
                    icon={<Edit24Filled />}
                  />
                </ToolbarGroup>
            
          </Toolbar>

          <div className="responsive-two-column-grid">
            <div>
                <div className="title">
                    <Title2>{teamDetails.name}</Title2> <br/>
                </div>
                <div>
                    <Subtitle2>Description:</Subtitle2><br/>
                    <Text>{teamDetails.description}</Text> <br/>
                    <Subtitle2>Created:</Subtitle2><br/>
                    <Text>{String(teamDetails.created).replace("T", " ").slice(0, -5)} by {teamDetails.createdBy}</Text> <br/>
                </div>
            </div>
            <div>
              {/* Add more details when users are implemented*/}
            </div>
          </div>
          {/* Add anything else needed */}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
