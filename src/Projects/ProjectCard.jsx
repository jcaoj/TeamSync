import React from "react";
import { useState, useContext } from "react";
import {
    makeStyles,
    Body1,
    Caption1,
    Button,
    shorthands,
    Text
  } from "@fluentui/react-components";
  import { ArrowReplyRegular, ShareRegular } from "@fluentui/react-icons";
  import {
    Card,
    CardFooter,
    CardHeader,
    CardPreview,
  } from "@fluentui/react-components";

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
    const [project, setProject] = useState(props.project)

    return (
      <Card className={styles.card} onSelectionChange={()=>props.onProjectSelected(project)}>
        <CardHeader
          header={
            <Body1> <b>{project.name}</b> </Body1>
          }
          description={<Caption1>{project.team}</Caption1>}
        />
  
        <p className={styles.text}> {project.description} </p>
        <p className={styles.text}> Imagine a second layered card here with a preview of the most recent post </p>
      </Card>
    );
}

