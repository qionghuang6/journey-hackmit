import { useState, useEffect } from "react";
import { Box, Typography, Grid, TextField } from "@mui/material";

export default function NewAdventure(props) {
  const [liked, setLiked] = useState(false);
  const [route, updateRoute] = useState([]);
  const [location, updateUserLocation] = useState(props.userLocation);
  const userId = props.userId;

  useEffect(() => {
    try {
      async function getPos() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              console.log("User location found", pos);
              await setUserLocation(pos);
            },
            () => {
              console.error("Error getting user location");
              throw new Error("Error getting user location");
            }
          );
        } else {
          // Browser doesn't support Geolocation
          console.error("Browser doesn't support GeoLocation");
          alert(
            "Your browser doesn't support GeoLocation, so you're unable to start an adventure."
          );
          throw new Error("Browser doesn't support GeoLocation");
        }
        console.log("set user location", userLocation);
      }
      getPos();
    } catch (e) {
      console.error("Error getting initial user location: ", e);
      alert(
        "There was an error getting your location, please refresh and try again."
      );
      throw new Error("Error getting initial user location: ", e);
    }
  }, []);

  /*const handleImageSubmit = (event) => {
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpg" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      setValidFile(true);
      const handleFile = (e) => {
        const content = e.target.result;
        setPic(content);
            console.log("RES", res);
          };
        uploadString(storageRef, content, "data_url").then((snapshot) =>
          post("/api/user/picture/add", {
            userId: props.userId,
            url: snapshot.metadata.name,
          }).then(() => {})
        );

        // You can set content in state and show it in render.
      };
      const reader = new FileReader();
      reader.onloadend = handleFile;
      reader.readAsDataURL(event.target.files[0]); // Converting file into data URL
    } else {
      setValidFile(false);
    }
  };*/

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
