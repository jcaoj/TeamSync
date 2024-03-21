import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";
import "./ViewPost.css"
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
  Spinner,
  Image,
  Avatar
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

export default function PostCard(props) {
  const styles = useStyles();
  const [imageName, setImageName] = useState();
  const [title, setTitle] = useState(props.post.title);
  const [caption, setCaption] = useState(props.post.caption);
  const [contextLoaded, setContextLoaded] = useState(false);
  const navigate = useNavigate();
  const images = require.context('../../server/public/images', true);

  useEffect(() => {
    if (title && caption) {
      setContextLoaded(true)
    }
  }, [title, caption])

  return (
    <> {
      contextLoaded ? (
        <Card className={styles.card}>
          <CardHeader
            //image={posts[post.image]} 
            header={<><Subtitle2Stronger>{title}</Subtitle2Stronger> 
              <div className="postCreatedByDate">
                <Caption1>{String(props.post.created).replace("T", " ").slice(0, -5)}</Caption1>
              </div>
            </>}
            description={ <><div className="postCreatedBy">
              <Avatar name={props.post.createdBy} size={20} /> 
              <Body1Strong className="postCreatedByName">{props.post.createdBy}</Body1Strong>
              </div></>}
          />
          <p className={styles.text}>
            {caption}
          </p>
          { (props.post.imageName == null) ? (
                <></>
                ) : (
                  <CardPreview>
                  <img src={images(`./${props.post.imageName}`)}
                    alt="Preview of a Word document: About Us - Overview"
                  />
                </CardPreview>
                )
          }
        </Card>
      ) : (
        <Spinner />
      )
    }
    </>
  );
}

