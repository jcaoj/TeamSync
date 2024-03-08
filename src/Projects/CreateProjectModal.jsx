import React, { useState, useContext, useEffect } from 'react';
import "./Projects.css";
import "../Modal.css";
import { Button, Textarea, Title2, Input, Label, Dropdown, Option, Spinner } from '@fluentui/react-components';
import { Context } from "../Context";
const options = [
    [1, "Cat"],
    [2, "Caterpillar"],
    [3, "Corgi"]
];
export default function CreateProjectModal({ onCreate, onClose, editProject = null}) {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedTeamName, setSelectedTeamName] = useState('');
    const [status, setStatus] = useState('');
    const [statusDescription, setStatusDescription] = useState('');
    const [isEditProject, setIsEditProject] = useState(false);
    const [projectLoaded, setProjectLoaded] = useState(false);

    const [teamsArray, setTeamsArray] = useState([]);
    const [statusesArray, setStatusesArray] = useState([]);
    const { statuses, setStatuses, teams, setTeams } = useContext(Context);

    const createProject = (e) => {
        e.preventDefault();
        onCreate({ isEditProject: isEditProject, name: projectName, description: description, teamId: selectedTeam, status: status });
    }

    useEffect(() => {
        if (editProject !== null) {
            setProjectName(editProject.name)
            setDescription(editProject.description)
            setSelectedTeam(editProject.teamId)
            setSelectedTeamName(teams[editProject.teamId].name)
            setStatus(editProject.status)
            setStatusDescription(statuses[editProject.status].description)
            setIsEditProject(true)
            setProjectLoaded(true)
        }
        else {
            setProjectLoaded(true)
        }

        var teamsFormatted = [];
        Object.keys(teams).forEach(function (key) {
            teamsFormatted.push([teams[key].id, teams[key].name]);
        });
        setTeamsArray(teamsFormatted);

        var statusesformatted = [];
        Object.keys(statuses).forEach(function (key) {
            statusesformatted.push([statuses[key].id, statuses[key].description, statuses[key].colour]);
        });
        setStatusesArray(statusesformatted);
    }, [])

    return (
        <div className="modal">
            <div className="modal-content">
                {
                    projectLoaded ? (
                        <>
                            <div className="title">
                                <Title2>{isEditProject ? "Edit " + projectName : "Create a New Project"}</Title2>
                            </div>
                            <form onSubmit={createProject} style={{ width: '100%' }}>
                                <Label htmlFor="projectName" size="large">
                                    Name
                                </Label>
                                <Input id="projectName"
                                    className="input"
                                    placeholder="Enter project name"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    required />
                                <Label htmlFor="team" size="large">
                                    Team
                                </Label>
                                <Dropdown
                                    aria-labelledby="team"
                                    id="team"
                                    placeholder="Select a team"
                                    className="input"
                                    defaultValue={selectedTeamName}
                                    defaultSelectedOptions={[selectedTeam]}
                                    onOptionSelect={(e, data) => setSelectedTeam(data.optionValue)}>
                                    {teamsArray.map((option) => (
                                        <Option key={option} text={option[1]} value={option[0]}>
                                            {option[1]}
                                        </Option>
                                    ))}
                                </Dropdown>
                                <Label htmlFor="status" size="large">
                                    Status
                                </Label>
                                <Dropdown
                                    aria-labelledby="status"
                                    placeholder="Select a status"
                                    className="input"
                                    defaultValue={statusDescription}
                                    defaultSelectedOptions={[status]}
                                    onOptionSelect={(e, data) => setStatus(data.optionValue)}>
                                    {statusesArray.map((status) => (
                                        <Option key={status[0]} text={status[1]} value={status[0]} >
                                            {status[1]}
                                        </Option>
                                    ))}
                                </Dropdown>
                                <Label htmlFor="projectDescription" size="large">
                                    Description
                                </Label>
                                <Textarea
                                    className="input"
                                    placeholder="Describe the project"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                                <div className="buttonGroup">
                                    <Button onClick={onClose}>Close</Button>
                                    <Button appearance="primary" type="submit">{isEditProject ? "Edit" : "Create"}</Button>
                                </div>
                            </form>
                        </>
                    ) : ( <Spinner/>
                        )
            }
            </div>
        </div>
    );
}
