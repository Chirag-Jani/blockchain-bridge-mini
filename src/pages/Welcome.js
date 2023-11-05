import React from "react";
import { Box, Typography } from "@mui/material";

const Welcome = () => {
  return (
    <Box p={4} maxWidth={600} margin="auto" textAlign="center">
      <Typography variant="h4" gutterBottom>
        Welcome to Token Exchange App
      </Typography>
      <Typography variant="body1" paragraph>
        Earn tokens by uploading images and exchange them for Ethereum (ETH).
        Our platform allows you to seamlessly convert your tokens into
        real-world value.
      </Typography>
      <Typography variant="body1">
        To get started, simply navigate to the "Upload" section and begin
        earning tokens today!
      </Typography>
    </Box>
  );
};

export default Welcome;
