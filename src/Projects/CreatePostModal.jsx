import React, { useState, useContext, useEffect } from 'react';
import "./Projects.css";
import "../Modal.css";
import axios from 'axios';
import { Button, Textarea, Title2, Input, Label, Dropdown, Option } from '@fluentui/react-components';
import { Context } from "../Context";

export default function CreatePostModal({ onCreate, onClose}) {
    const [files, setFiles] = useState();
    const [previews, setPreviews] = useState();
    const [message, setMessage] = useState([]);

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
      <div className="modal">
          <div className="modal-content">
            <div className="title">
              <Title2>Post Preview</Title2>
            </div>
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
              className="input"
              value={message}
              onChange={(e) => setMessage([e.target.value])}
            />
          </div>
        <div className="buttonGroup">
            <Button onClick={onClose}>Close</Button>
            <Button onClick={handleUpload} appearance="primary" type="submit">
            Upload</Button>
        </div>
        </form>
        </div>
      </div>
    );
}