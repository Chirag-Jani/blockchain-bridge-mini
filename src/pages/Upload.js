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
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

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

  const handleUpload = async (event) => {
    try {
      const projectId = "2T3eMNF8knKDGTpszZDyVBGuTrb";
      const projectSecret = "83431740a593de7a6b5da01b98610c30";
      const auth =
        "Basic " +
        Buffer.from(projectId + ":" + projectSecret).toString("base64");
      const client = create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        apiPath: "/api/v0",
        headers: {
          authorization: auth,
        },
      });

      try {
        const added = await client.add(selectedImage);
        let cid = added.path;
        callContractUpload(cid);
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const callContractUpload = async (cid) => {
    try {
      const tx = await managerContract.uploadImage(cid, selectedOption);
      console.log(tx);

      if (tx) {
        getTokens();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getTokens = async () => {
    try {
      const tx = await managerContract.getTokens();
      console.log(tx);
    } catch (e) {
      console.log(e);
    }
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
