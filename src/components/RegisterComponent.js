// MUI imports
import { Box, Button, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

const LoginComponent = ({ currentAccount, authContract }) => {
  const navigate = useNavigate();

  // login function
  const signUp = async () => {
    try {
      const tx = await authContract.register();
      console.log(tx);
      navigate("/");
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
        Register with your MetaMask wallet
      </Typography>
      <Button
        variant="contained"
        startIcon={<LoginIcon />}
        sx={{
          margin: "5px",
          padding: "10px",
        }}
        onClick={signUp}
      >
        Register
      </Button>
    </Box>
  );
};
export default LoginComponent;
