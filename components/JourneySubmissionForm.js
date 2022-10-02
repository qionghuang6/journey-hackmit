import { useState, useEffect } from "react";
import { Box, Typography, Grid, TextField } from "@mui/material";
import ImageViewer from "./ImageViewer";

export default function JourneySubmissionForm(props) {
  const [images, updateImages] = useState([]);

  useEffect(() => {}, []);

  const handleImageSubmit = (event) => {
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpg" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      const handleFile = (e) => {
        const content = e.target.result;
        updateImages((current) => [...current, content]);
        console.log("RES", res);
        const reader = new FileReader();
        reader.onloadend = handleFile;
        reader.readAsDataURL(event.target.files[0]); // Converting file into data URL
        // You can set content in state and show it in render.
      };
    } else {
    }
  };

  return (
    <Box sx={{ position: "absolute", width: "100%", height: 200 }}>
      <h4>First, let's upload any pictures of your journey</h4>
      <ImageViewer props={images} />
      <input type="file" name="file" onChange={handleImageSubmit} />
    </Box>
  );
}
