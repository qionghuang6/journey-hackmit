import { useState, useEffect } from "react";
import { Box, Typography, Grid, TextField } from "@mui/material";
import ImageViewer from "./ImageViewer";

export default function JourneySubmissionForm(props) {
  const [images, updateImages] = useState([]);

  useEffect(() => {}, []);

  const handleImageSubmit = (event) => {
    try {
      console.log("TRIED ", event.target.files[0].type);
      if (
        event.target.files[0].type === "image/png" ||
        event.target.files[0].type === "image/jpg" ||
        event.target.files[0].type === "image/jpeg"
      ) {
        const handleFile = (e) => {
          const content = e.target.result;
          console.log(content);
          const reader = new FileReader();
          reader.onloadend = handleFile;
          console.log(event.target.files[0]);
          reader.readAsDataURL(content); // Converting file into data URL
          console.log(reader);
          updateImages((current) => [...current, content]);
          e.target.value = null;
          // You can set content in state and show it in render.
        };
        handleFile(event);
      }
    } catch (e) {
      console.error("Error when trying to upload image: ", e);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: 200,
        top: "50%",
        backgroundColor: "primary.dark",
        zIndex: 1000,
      }}
    >
      <h4>First, let's upload any pictures of your journey</h4>
      <ImageViewer props={images} />
      <input type="file" name="file" onChange={handleImageSubmit} />
    </Box>
  );
}
