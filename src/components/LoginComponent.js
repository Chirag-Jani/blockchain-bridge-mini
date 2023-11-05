// MUI imports
import { Box, Button, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

const LoginComponent = ({ currentAccount, authContract }) => {
  const navigate = useNavigate();

  // login function
  const loginUser = async () => {
    try {
      const tx = await authContract.loginAndLogout();
      console.log(tx);
      navigate("/home");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        id="outlined-basic"
        variant="outlined"
        value={currentAccount}
        sx={{
          margin: "5px",
        }}
        inputProps={{ style: { textAlign: "center", fontSize: "17px" } }}
        disabled
      />
      <Typography
        sx={{
          margin: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <img
          src={MetaMaskLogo}
          alt=""
          style={{
            width: "30px",
            height: "auto",
            margin: "0 10px",
          }}
        />{" "} */}
        Login with your MetaMask wallet
      </Typography>
      <Button
        variant="contained"
        startIcon={<LoginIcon />}
        sx={{
          margin: "5px",
          padding: "10px",
        }}
        onClick={loginUser}
      >
        Login
      </Button>
    </Box>
  );
};
export default LoginComponent;
