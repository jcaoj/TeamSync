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
                <TabList>
                    <Tab value="projects">Projects</Tab>
                    <Tab value="teams">Teams</Tab>
                    <Tab value="settings">Settings</Tab>
                </TabList>
            </div>
            <Divider />
        </>
    );
}

