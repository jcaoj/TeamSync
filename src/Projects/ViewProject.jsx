import React, { useState, useEffect, useContext } from "react";
import {Context} from "../Context";
import {
  Button,
  Title2,
  Title3,
  Text,
  Spinner
} from "@fluentui/react-components";
import axios from 'axios';

export default function ViewCreateProject(props) {
  const {statuses, setStatuses, teams, setTeams} = useContext(Context);
  const [project, setExistingProject] = useState(props.project);

  return (
    <>
      {
      <div className="page-padding page">
        <div className="title">
          {
            <>
              <Title2>{project.name}</Title2>
              <br />
              <Title3>Team: {teams[project.teamId].name}</Title3>
              <br />
              <Text>{project.description}</Text>
              <br />
              <br />
              <div>
                <Button appearance="primary">
                  Create Post
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => props.onReturnToProjects()}
                  appearance="primary"
                >
                  Back To Projects
                </Button>
              </div>
            </>
          }
        </div>
      </div>
    }
    </>
  );
}
