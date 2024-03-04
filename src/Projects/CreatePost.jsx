import React, { useEffect, useState } from "react";
import { Button, Title2, Title3, Text } from '@fluentui/react-components';
import axios from 'axios';
import './Posts.css';

export default function Posts(props) {
  const [files, setFiles] = useState();
  const [previews, setPreviews] = useState();
  const [message, setMessage] = useState("");

  const handleFile = (e) => {
    setFiles(e.target.files[0]);
  }
  const handleUpload = () => {
    const formdata = new FormData();
    formdata.append('image', files[0]);
    formdata.append('message', message);
    axios.post("http://localhost:8081/upload", formdata)
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
      <h3>Post Preview</h3>
      <input
        type="file"
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
          return <img key={index} src={pic} alt={`preview-${index}`} />;
        })}
        <div class="message">
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      <div>
        <Button onClick={handleUpload} appearance="primary">
          Upload
        </Button>
      </div>
    
    </main>
  );
}
