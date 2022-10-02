import { useState, useEffect } from "react";
import { Box, Typography, Grid, TextField } from "@mui/material";

export default function NewAdventure(props) {
  const [liked, setLiked] = useState(false);
  const userId = props.userId;

  return (
    <Box sx={{ position: "relative", width: "100%", height: 200 }}>
      <img
        src="experience.jpeg"
        style={{
          cursor: "pointer",
          position: "absolute",
          zIndex: "1",
          objectFit: "contain",
          top: "0%",
          width: "70%",
          height: "same-as-width",
          borderRadius: "16px",
          ...eStyle,
        }}
      />
      <img
        src="journey.jpeg"
        style={{
          cursor: "pointer",
          position: "absolute",
          objectFit: "contain",
          margin: "auto",
          top: "25%",
          left: "60%",
          width: "60%",
          height: "same-as-width",
          borderRadius: "16px",
          ...jStyle,
        }}
      />
    </Box>
  );
}
