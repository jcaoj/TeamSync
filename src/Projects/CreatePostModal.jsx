import React, { useState, useContext, useEffect } from 'react';
import "./Projects.css";
import "../Modal.css";
import axios from 'axios';
import { Button, makeStyles, Textarea, Title2, Input, Label, Dropdown, Option } from '@fluentui/react-components';
import { Context } from "../Context";

const useStyles = makeStyles({
    modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '40px', 
        border: '1px solid #ccc',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: 'auto', 
        minWidth: '300px', 
        maxWidth: '600px', 
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px', 
        boxSizing: 'border-box', 
    },
    input: {
      width: '100%', 
      marginBottom: '20px', 
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%', 
      marginTop: '20px', 
      gap: '10px', 
    },
  });

export default function CreatePostModal({ onCreate, onClose}) {
    const [files, setFiles] = useState();
    const [previews, setPreviews] = useState();
    const [message, setMessage] = useState([]);
    const styles = useStyles();

    const handleFile = (e) => {
      setFiles(e.target.files[0]);
    }
    const handleUpload = () => {
        if (!files || files.length === 0) {
          console.log("No image selected for upload");
          return;
        }
  
        const formdata = new FormData();
        for (let i=0; i < files.length; i++) {
          formdata.append('image', files[i]);
        }
      axios.post("http://localhost:8081/uploadPost", formdata)
      formdata.append('message', message);
      const config = {     
        headers: { 'content-type': 'multipart/form-data' }
      }
      axios.post("http://localhost:8081/uploadPost", formdata, config)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }

    // rendering previews
    useEffect(() => {
      if (!files) return;
      let tmp = [];
      for (let i = 0; i < files.length; i++) {
        tmp.push(URL.createObjectURL(files[i]));
      }
      const objectUrls = tmp;
      setPreviews(objectUrls);

      // free memory
      return () => {
        for (let i = 0; i < objectUrls.length; i++) {
          URL.revokeObjectURL(objectUrls[i]);
        }
      };
    }, [files]);

    const isExistingProject = true; 
    const existingProject = {
      name: "Project Name",
      team: "Project Team",
      description: "Project Description",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({ id: Date.now(), name: setFiles, setMessage });
      };

    return (
      <div className={styles.modal}>
        <br />
          <Title2 className={styles.title}>Post Preview</Title2>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <input
          type="file"
          className="fileUpload"
          accept="image/jpg, image/jpeg, image/png"
          multiple
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFiles(e.target.files);
            }
          }}
        />
        {previews &&
          previews.map((pic, index) => {
            return <img className="postImage" key={index} src={pic} alt={`preview-${index}`} />;
          })}
          <div class="message">
            <label>Message:</label>
            <Textarea
              className={styles.input}
              value={message}
              onChange={(e) => setMessage([e.target.value])}
            />
          </div>
        <div className={styles.buttonGroup}>
            <Button className={styles.button} onClick={onClose}>Close</Button>
            <Button className={styles.button} onClick={handleUpload} appearance="primary" type="submit">
            Upload</Button>
        </div>
        </form>
      </div>
    );
}