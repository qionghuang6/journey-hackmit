import { useState, useEffect } from "react";
import { Box, Typography, Grid, TextField } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

/*img 

with two buttons on the left and right 
can click on either one to advance left or right in the array of images with a different source
state with index*/

export default function ImageViewer(props) {
  const [images, updateImages] = useState(props.images || []);
  const [currIndex, updateIndex] = useState(0);

  function handleLeftClick() {
    if (currIndex - 1 < 0) {
      updateIndex(images.length - 1);
    } else {
      updateIndex(currIndex - 1);
    }
  }

  function handleRightClick() {
    if (currIndex + 1 >= images.length) {
      updateIndex(0);
    } else {
      updateIndex(currIndex + 1);
    }
  }
  console.log("image viewer images", images);
  return (
    <div style={{padding:'10px'}}>
      {images.length > 0 ?
      <ArrowCircleLeftIcon
        onClick={handleLeftClick}
        style={{
          cursor: "pointer",
          position: "absolute",
          zIndex: "5",
          top: "50%",
        }}
      />:<div></div>}
      {images.length > 0 ? <img src={images[currIndex]} /> : <div />}
      {images.length > 0 ?
      <ArrowCircleRightIcon
        onClick={handleRightClick}
        style={{
          cursor: "pointer",
          position: "absolute",
          zIndex: "5",
          top: "50%",
        }}
      />:<div></div>}

    </div>
  );
}
