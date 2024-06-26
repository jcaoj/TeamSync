import * as React from "react";
import {
    Image,
    makeStyles,
    shorthands,
    Tab,
    TabList,
    Subtitle1,
    Subtitle2,
    Divider,
    Avatar,
    Menu,
    MenuTrigger,
    MenuList,
    MenuItem,
    MenuPopover,
    Spinner
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
        position: "sticky",
        top: "0",
        zIndex: "10",
        backgroundColor: "inherit",
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
    },
    avatar: {
        right: "20px",
        top: "15px",
        position: "absolute"
    },
    username: {
        ...shorthands.padding("0px", "10px"),
    }
});

export default function Layout() {
    const styles = useStyles()
    const { username, setUsername, userId, setUserId, profilePicName, setProfilePicName, setStatuses, teams, setTeams, projects, setProjects, currentPage, setCurrentPage } = useContext(Context);
    //const [currentPage, setCurrentPage] = useState("projects");
    const [pageLoaded, setPageLoaded] = useState(false);
    const [profilePic, setProfilePic] = useState(false);
    const navigate = useNavigate();
    const images = require.context('../server/public/images', true);

    const NavToPage = (event, data) => {
        setCurrentPage(data.value);
        navigate("/" + data.value);
    }

    function sendToLogin() {
        setUsername(null);
        setUserId(null);
        localStorage.removeItem("username")
        localStorage.removeItem("userId")
        localStorage.removeItem("profilePicName")
        navigate("/login");
    }

    function goToArchivedProjects() {
        navigate("/archivedProjects");
    }

    function formatStatuses(statusesJSON) {
        var statusDict = {};
        Object.keys(statusesJSON).forEach(function (key) {
            statusDict[statusesJSON[key].id] = statusesJSON[key];
        });
        setStatuses(statusDict);
    }

    function formatTeams(teamsJSON) {
        var teamsDict = {};
        Object.keys(teamsJSON).forEach(function (key) {
            teamsDict[teamsJSON[key].id] = teamsJSON[key];
        });
        setTeams(teamsDict);
    }

    function formatProjects(projectsJSON) {
        var projectsDict = {};
        Object.keys(projectsJSON).forEach(function (key) {
            projectsDict[projectsJSON[key].id] = projectsJSON[key];
        });
        setProjects(projectsDict);
    }

    useEffect(() => {
        if (!username && localStorage.getItem("username")) {
            setUsername(localStorage.getItem("username"))
            setUserId(localStorage.getItem("userId"))
            setProfilePicName(localStorage.getItem("profilePicName"))
        }
        else if (!username) {
            sendToLogin()
        }

        if (userId != undefined) {
            axios.get("http://localhost:8081/getStatuses")
                .then(res => formatStatuses(res.data))
                .catch(err => console.log(err));

            axios.get(`http://localhost:8081/getTeams?userId=${userId}`)
                .then(res => formatTeams(res.data))
                .catch(err => console.log(err));

            axios.get(`http://localhost:8081/getProjectByUserId?userId=${userId}`)
                .then(res => formatProjects(res.data))
                .catch(err => console.log(err));

            try {
                setProfilePic(images(`./${profilePicName}`))
            }
            catch (err) {
                setProfilePic(false);
            }

            if (currentPage) {
                setPageLoaded(true);
            }
        }

    }, [userId, currentPage])

    return (
        <>
            {
                pageLoaded ? (
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
                            </TabList>
                            <div className={styles.avatar}>
                                <Menu>
                                    <MenuTrigger disableButtonEnhancement>
                                        {
                                            !profilePic ? (
                                                <Avatar name={username} />
                                            ) : 
                                            (
                                                <Avatar name={username} image={{src: profilePic}} />
                                            )
                                        }
                                        
                                    </MenuTrigger>

                                    <MenuPopover>
                                        <Subtitle2 className={styles.username}>{username}</Subtitle2>
                                        <br /><br />
                                        <MenuList>
                                            <MenuItem onClick={goToArchivedProjects}>Archived Projects</MenuItem>
                                            <MenuItem onClick={sendToLogin}>Log Out</MenuItem>
                                        </MenuList>
                                    </MenuPopover>
                                </Menu>

                            </div>
                        </div>
                        <Divider className={styles.divider} />
                        
                    </>
                ) :
                    (
                        <div className="spinnerContainer">
                            <Spinner />
                        </div>
                    )
            }
           <Outlet />
        </>
    );
}

