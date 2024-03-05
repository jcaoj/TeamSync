import React, { useState } from 'react';
import { Button, makeStyles, Textarea, Title2, Label, Text } from '@fluentui/react-components';

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


export default function CreateTeamModal({ onCreate, onClose }) {
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const styles = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ id: Date.now(), name: teamName, description });
  };

  return (
    <div className={styles.modal}>
      <Title2 className={styles.title}>Create a New Team</Title2>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Label htmlFor="teamName" size="large">
                  Team Name
        </Label>
        <Textarea
          className={styles.input}
          placeholder="Enter team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <Label htmlFor="description" size="large">
                  Description
        </Label>
        <Textarea
          className={styles.input}
          placeholder="Describe the team"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className={styles.buttonGroup}>
          <Button className={styles.button} onClick={onClose}>Close</Button>
          <Button className={styles.button} appearance="primary" type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
}
