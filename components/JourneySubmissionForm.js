import { useState, useEffect } from "react";
import { Box, Typography, Grid, TextField } from "@mui/material";

import styles from "../styles/map.module.css";
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
    <div className={styles.Journey}>
      <div className={styles.JourneyBox}>
      <div>First, let's upload any pictures of your journey
      </div>
      <div><input type="file" name="file" onChange={handleImageSubmit} /></div>

      <div><ImageViewer props={images} /></div>
    </div>
    </div>
  );
}
