// native and react imports
import * as React from "react";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";

// MUI imports
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function Auth({ authContract, currentAccount }) {
  // state to handle tab switches
  const [selectedTab, setSelectedTab] = React.useState("login");

  // changing tabs
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        width: "25%",
        margin: "100px auto",
        typography: "body1",
        boxShadow: "5px 4px 13px -4px rgba(0, 0, 0, 0.5)",
        borderRadius: "10px ",
        textAlign: "center",
      }}
    >
      <TabContext value={selectedTab}>
        <Box>
          <TabList onChange={handleChange}>
            <Tab
              sx={{
                width: "50%",
                fontSize: "18px",
                fontWeight: "700",
              }}
              label="Login"
              value="login"
            />
            <Tab
              sx={{
                width: "50%",
                fontSize: "18px",
                fontWeight: "700",
              }}
              label="Register"
              value="register"
            />
          </TabList>
        </Box>
        <TabPanel value="login">
          <LoginComponent
            authContract={authContract}
            currentAccount={currentAccount}
          />
        </TabPanel>
        <TabPanel value="register">
          <RegisterComponent
            authContract={authContract}
            currentAccount={currentAccount}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
