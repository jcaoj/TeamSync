import React from "react";
import { useState } from "react";
import { Button, Title2, Title3, Text, makeStyles, Dropdown, Option,Textarea, 
    shorthands, Input, Label } from '@fluentui/react-components';

const useStyles = makeStyles({
    input: {
        // Stack the label above the field
        display: "flex",
        flexDirection: "column",
        // Use 2px gap below the label (per the design system)
        ...shorthands.gap("2px"),
        // Prevent the example from taking the full width of the page (optional)
        maxWidth: "600px",
    },
});


export default function ViewCreateProject(props) {

    const [existingProject, setExistingProject] = useState(props.project)
    const [isExistingProject, setIsExistingProject] = useState(existingProject != null)
    const [selectedTeam, setSelectedTeam] = useState();
    const styles = useStyles();
    const options = [
        "Cat",
        "Caterpillar",
        "Corgi",
        "Chupacabra",
        "Dog",
        "Ferret",
        "Fish",
        "Fox",
        "Hamster",
        "Snake",
      ];

    function createNewProject() {
        setExistingProject({
            name: document.getElementById("projectName").value,
            team: selectedTeam,
            description: document.getElementById("description").value,
        })

        setIsExistingProject(true)
    }

    function onTeamSelected(event, data) {
        console.log(data.optionValue)
        setSelectedTeam(data.optionValue)
    }

    return (
        <>
            <div className="page-padding page">
                <div className="title">
                    {isExistingProject ? (
                        <>
                            <Title2>{existingProject.name}</Title2><br/>
                            <Title3>Team: {existingProject.team}</Title3><br/>
                            <Text>{existingProject.description}</Text>
                            <br/><br/>
                            <div>
                                <Button onClick={() => props.onReturnToProjects()} appearance="primary">Back To Projects</Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Title2>New Project</Title2>
                            <br/><br/>
                            <div className={styles.input}>
                                <Label htmlFor="projectName" size="large">
                                    Project Name
                                </Label>
                                <Input id="projectName" {...props}/>
                                <br/>
                                <Label htmlFor="teamDropdown" size="large">Team</Label>
                                <Dropdown id="teamDropdown" aria-labelledby="teamDropdown" placeholder="Select a team" {...props}
                                    onOptionSelect={onTeamSelected} >
                                    {options.map((option) => (
                                    <Option key={option}>
                                        {option}
                                    </Option>
                                    ))}
                                </Dropdown>
                                <br/>
                                <Label htmlFor="description" size="large">Description</Label>
                                <Textarea id="description" {...props} />
                            </div>
                            <br/>

                            <div>
                                <Button onClick={createNewProject} appearance="primary">Create Project</Button>
                            </div>
                            <br/>
                            <div>
                                <Button onClick={() => props.onReturnToProjects()} appearance="primary">Back To Projects</Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}