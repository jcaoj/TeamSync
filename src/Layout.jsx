import * as React from "react";
import {
    Image,
    makeStyles,
    shorthands,
    Tab,
    TabList,
    Subtitle1,
    Divider
} from "@fluentui/react-components";
import Logo from "./logo2.png";
import { Outlet, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import { Context } from "./Context";
import axios from 'axios';


const useStyles = makeStyles({
    root: {
        alignItems: "flex-end",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex",
        ...shorthands.padding("15px", "20px", "0px"),
        columnGap: "10px",
    },
    logoTitle: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        columnGap: "10px",
        marginBottom: "8px"
    }
});

export default function Layout() {
    const styles = useStyles()
    const {statuses, setStatuses, teams, setTeams} = useContext(Context);
    const [currentPage, setCurrentPage] = useState("projects");
    const navigate = useNavigate();

    const NavToPage = (event, data) => {
        setCurrentPage(data.value);
        navigate("/" + data.value);
    }

    function formatStatuses(statusesJSON) {
        var formatted = [];
        Object.keys(statusesJSON).forEach(function(key) {
            formatted.push([statusesJSON[key].id, statusesJSON[key].description, statusesJSON[key].colour]);
          });
        setStatuses(formatted);
    }

    function formatTeams(teamsJSON) {
        var teamsDict = {};
        Object.keys(teamsJSON).forEach(function(key) {
            teamsDict[teamsJSON[key].id] =teamsJSON[key];
          });
        setTeams(teamsDict);
    }

    useEffect(() => {
        axios.get("http://localhost:8081/getStatuses")
        .then(res => formatStatuses(res.data))
        .catch(err => console.log(err));

        axios.get("http://localhost:8081/getTeams")
        .then(res => formatTeams(res.data))
        .catch(err => console.log(err));
    }, [])

    return (
        <>
            <div className={styles.root}>
                <div className={styles.logoTitle}>
                    <Image
                        alt="TeamSync Logo"
                        src={Logo}
                        height={35}
                        width={35}
                    />
                    <Subtitle1>TeamSync</Subtitle1>
                </div>
                <TabList selectedValue={currentPage} onTabSelect={NavToPage}>
                    <Tab value="projects">Projects</Tab>
                    <Tab value="teams">Teams</Tab>
                    <Tab value="settings">Settings</Tab>
                    <Tab value="posts">Posts</Tab>
                </TabList>
            </div>
            <Divider />
            <Outlet/>
        </>
    );
}

