import React, { useState } from 'react';
import { Button, Textarea, Title2, Label, Input } from '@fluentui/react-components';
import '../Modal.css'; 

export default function CreateTeamModal({ onCreate, onClose }) {
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({id: Date.now(), name: teamName, description: description});
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="title">
          <Title2>Create a New Team</Title2>
        </div>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Label htmlFor="teamName" size="large">
            Team Name
          </Label>
          <Input
            id="teamName"
            className="input"
            placeholder="Enter team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
          <Label htmlFor="description" size="large">
            Description
          </Label>
          <Textarea
            id="description"
            className="input"
            placeholder="Describe the team"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="buttonGroup">
            <Button onClick={onClose}>Close</Button>
            <Button appearance="primary" type="submit">Create</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
