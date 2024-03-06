import React, { useEffect, useState } from "react";
import { Button, Title2, Title3, Text } from '@fluentui/react-components';
import axios from 'axios';
import './Posts.css';

export default function Posts(props) {
  const [files, setFiles] = useState();
  const [previews, setPreviews] = useState();
  const [message, setMessage] = useState([]);

  const handleFile = (e) => {
    setFiles(e.target.files[0]);
  }
  const handleUpload = () => {
    const formdata = new FormData();
    for (let i=0; i < files.length; i++) {
      console.log(files[i]);
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

  return (
    <main className="container">
      <br />
      <div className="title">
        <Title2>Post Preview</Title2>
        </div>
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
          <textarea
            className="messageInput"
            value={message}
            onChange={(e) => setMessage([e.target.value])}
          />
        </div>
      <div>
        <Button className="uploadButton" onClick={handleUpload} appearance="primary">
          Upload
        </Button>
      </div>
    </main>
  );
}
