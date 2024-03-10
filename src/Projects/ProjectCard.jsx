import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";
import "./ViewProject.css"
import {
  makeStyles,
  Body1Strong,
  Caption1,
  Subtitle2Stronger,
  Button,
  shorthands,
  Text,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Spinner
} from "@fluentui/react-components";
import {
  FolderOpen16Filled,
  LockClosed16Filled,
  Archive16Filled,
  Edit24Filled,
  Eye24Regular,
  Eye24Filled
} from "@fluentui/react-icons";


const useStyles = makeStyles({
  card: {
    ...shorthands.margin("auto"),
    width: "100%",
    maxWidth: "100%",
  },
  text: {
    ...shorthands.margin(0),
  }
});

export default function ProjectCard(props) {
  const styles = useStyles();
  const [project, setProject] = useState(props.project);
  const { statuses, setStatuses, teams, setTeams } = useContext(Context);
  const [contextLoaded, setContextLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (statuses && teams) {
      setContextLoaded(true)
    }
  }, [statuses, teams])

  return (
    <> {
      contextLoaded ? (
        <Card className={styles.card} onSelectionChange={() => navigate("/viewProject/" + project.id)}>
        <CardHeader
          header={
            <>
              {
                (() => {
                  switch (project.status) {
                    case "ACT":
                      return <FolderOpen16Filled className="statusIconCard" primaryFill={statuses[project.status].colour}></FolderOpen16Filled>;
                    case "CLSD":
                      return <LockClosed16Filled className="statusIconCard" primaryFill={statuses[project.status].colour}></LockClosed16Filled>;
                    case "ARCH":
                      return <Archive16Filled className="statusIconCard" primaryFill={statuses[project.status].colour}></Archive16Filled>;
                  }
                })()
              } 
              <Subtitle2Stronger>{project.name}</Subtitle2Stronger>
            </>
          }
          description={<Body1Strong>{teams[project.teamId].name}</Body1Strong>}
          action={<>
            <Button
              appearance="transparent"
              icon={<Eye24Regular />}
              aria-label="Following"
            />
          </>
          }
        />
        <p className={styles.text}> {project.description} </p>
        <p className={styles.text}> Imagine a second layered card here with a preview of the most recent post </p>
      </Card>
      ) : (
        <Spinner/>
      )
    }
    </>
  );
}

