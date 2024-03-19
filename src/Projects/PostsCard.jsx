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
  Spinner
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

export default function PostCard({ post, posts }) {
  const styles = useStyles();
  const { image, caption } = useContext(Context);
  const [contextLoaded, setContextLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (image && caption) {
      setContextLoaded(true)
    }
  }, [image, caption])

  return (
    <> {
      contextLoaded ? (
        <Card className={styles.card}>
          <CardHeader
            image={posts[post.image]} 
            description={<Body1Strong>{post.caption}</Body1Strong>}
          />
        </Card>
      ) : (
        <Spinner/>
      )
    }
    </>
  );
}

