import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum); // Replace with your Infura project ID or any other Ethereum provider

const Upload = ({ managerContract, tokenPool, getTokenPool }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [tkInfo, setTkInfo] = useState({
    tkName: "N/A",
    tkSym: "N/A",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleOptionChange = async (event) => {
    setSelectedOption(event.target.value);
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

  const handleUpload = () => {
    console.log("Selected File:", selectedImage);
    console.log("Selected Option:", selectedOption);
  };

  useEffect(() => {
    getTokenPool();
  });

  return (
    <Box p={4} maxWidth={400} margin="auto">
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
        }}
      >
        Upload NFT
      </Typography>
      <Box mb={2}>
        <FormControl fullWidth variant="outlined">
          <Typography>Select Image</Typography>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="select-label">Select Option</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={selectedOption}
            onChange={handleOptionChange}
            label="Select Option"
          >
            {tokenPool?.map((item) => {
              return (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          my: 2,
        }}
      >
        <Typography sx={{ my: 1 }}>Token Name: {tkInfo.tkName}</Typography>
        <Typography sx={{ my: 1 }}>Token Symbol: {tkInfo.tkSym}</Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        fullWidth
        disabled={!selectedImage || !selectedOption}
      >
        Upload Image
      </Button>
    </Box>
  );
};

export default Upload;
