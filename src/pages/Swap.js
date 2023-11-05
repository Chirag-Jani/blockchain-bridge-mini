import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const Swap = ({
  swapperContract,
  tokenPool,
  getTokenPool,
  SWAPPER_CONTRACT,
  currentAccount,
}) => {
  const [selectedToken, setSelectedToken] = useState("");
  const [numberOfTokens, setNumberOfTokens] = useState("");
  const [tkInfo, setTkInfo] = useState({
    tkName: "N/A",
    tkSym: "N/A",
  });

  const handleTokenChange = async (event) => {
    setSelectedToken(event.target.value);
    const tokenContract = new ethers.Contract(
      event.target.value,
      [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
      ],
      provider
    );
    const tokenName = await tokenContract.name();
    const tokenSymbol = await tokenContract.symbol();
    setTkInfo({
      tkName: tokenName,
      tkSym: tokenSymbol,
    });
  };

  const handleNumberOfTokensChange = (event) => {
    setNumberOfTokens(event.target.value);
  };

  const handleSwap = async () => {
    // Add logic to initiate the token swap
    const signer = provider.getSigner();

    const tokenContract = new ethers.Contract(
      selectedToken,
      [
        "function approve(address spender, uint256 amount) public returns (bool)",
      ],
      signer
    );

    const approvalTx = await tokenContract.approve(
      SWAPPER_CONTRACT,
      ethers.utils.parseUnits(numberOfTokens, "ether")
    );

    await approvalTx.wait();

    try {
      const tx = await swapperContract.swapTokensForEther(
        selectedToken,
        numberOfTokens
      );
      console.log("Token Swap done. You can withdraw your ETH now!!!");
    } catch (e) {
      console.log(e);
    }
  };

  const withdrawEth = async () => {
    try {
      const tx = await swapperContract.withdrawEther();
      console.log("Withdrawal Done!!!!");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTokenPool();
  });

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
          {tokenPool?.map((item) => {
            return (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      <Box
        sx={{
          my: 2,
        }}
      >
        <Typography sx={{ my: 1 }}>Token Name: {tkInfo.tkName}</Typography>
        <Typography sx={{ my: 1 }}>Token Symbol: {tkInfo.tkSym}</Typography>
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
      <Button variant="contained" color="primary" onClick={withdrawEth}>
        Withdraw ETH
      </Button>
    </Box>
  );
};

export default Swap;
