import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

const Swap = () => {
  const [selectedToken, setSelectedToken] = useState("");
  const [numberOfTokens, setNumberOfTokens] = useState("");

  const handleTokenChange = (event) => {
    setSelectedToken(event.target.value);
  };

  const handleNumberOfTokensChange = (event) => {
    setNumberOfTokens(event.target.value);
  };

  const handleSwap = () => {
    // Add logic to initiate the token swap
    console.log(`Swapping ${numberOfTokens} ${selectedToken} tokens`);
  };

  return (
    <Box p={4} maxWidth={400} margin="auto" textAlign="center">
      <Typography variant="h4" gutterBottom>
        Token Swap
      </Typography>
      <Box mb={2}>
        <Select
          value={selectedToken}
          onChange={handleTokenChange}
          fullWidth
          variant="outlined"
          displayEmpty
          inputProps={{ "aria-label": "Select Token" }}
        >
          <MenuItem value="" disabled>
            Select Token
          </MenuItem>
          <MenuItem value="Token1">Token 1</MenuItem>
          <MenuItem value="Token2">Token 2</MenuItem>
          <MenuItem value="Token3">Token 3</MenuItem>
        </Select>
      </Box>
      <Box mb={2}>
        <TextField
          type="number"
          label="Number of Tokens"
          variant="outlined"
          fullWidth
          value={numberOfTokens}
          onChange={handleNumberOfTokensChange}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleSwap}>
        Swap Tokens
      </Button>
    </Box>
  );
};

export default Swap;
