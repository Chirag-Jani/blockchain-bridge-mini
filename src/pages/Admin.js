import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";

const Admin = ({ managerContract }) => {
  const tokenNameRef = useRef("");
  const tokenSymbolRef = useRef("");

  const createToken = async () => {
    try {
      const tx = await managerContract.createToken(
        tokenNameRef.current.value,
        tokenSymbolRef.current.value
      );
      console.log(tx);

      const receipt = await tx.wait();
      const { events } = receipt;
      console.log(receipt);

      if (events) {
        const valueUpdatedEvent = events.find(
          (event) => event.event === "TokenCreated"
        );
        if (valueUpdatedEvent) {
          const emittedValue = valueUpdatedEvent.args[1];
          console.log("Event found", emittedValue);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   const adminOrNot = async () => {
  //     try {
  //       const tx = await managerContract.owner();
  //     } catch (e) {
  //       console.error("Error:", e);
  //     }
  //   };
  // });

  return (
    <Box p={4} maxWidth={400} margin="auto">
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
        }}
      >
        Admin Dashboard
      </Typography>
      <TextField
        fullWidth
        label="Token Name"
        variant="outlined"
        inputRef={tokenNameRef}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Token Symbol"
        variant="outlined"
        inputRef={tokenSymbolRef}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={createToken}
        fullWidth
      >
        Generate Token
      </Button>
    </Box>
  );
};

export default Admin;
