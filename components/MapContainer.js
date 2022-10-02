import { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import mapStyles from "../src/mapStyles";
import getApiUrl from "../src/getApiUrl";
import Story from "../components/Story";
import Dialog from "@mui/material/Dialog";
function MapContainer(props) {
  const [myMarkers, setMyMarkers] = useState([]);
  const [openStory, setOpenStory] = useState(false);
  const [userLocation, setUserLocation] = useState(props.userLocation);
  const [locationTimer, updateTimer] = useState(5);
  let timer = setTimeout(function () {
    if (locationTimer > 0) {
      updateTimer(locationTimer - 1);
    } else {
      updateUserLocation();
      updateTimer(5);
    }
  }, 1000);

  useEffect(() => {
    const body = {
      name: "eating",
      latitude: 40.8,
      longitude: -74.01,
      parent: "dylan",
      rating: "5",
      tag: "restaurant",
      pictures: ["./phil.jpeg"],
    };
    const postExperience = async () => {
      const res = await fetch(getApiUrl(`/api/experiences/add`), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log("RES", res);
    };

    const query = {
      users: ["test", "hi"],
      longitude: -74,
      latitude: 40.79,
      tag: "restaurant",
    };
    const getExperiences = async () => {
      const res = await fetch(
        getApiUrl(`/api/experiences/radar?${new URLSearchParams(query)}`),
        { method: "GET" }
      );
      const result = await res.json();
      setMyMarkers(Array.from(new Set(result.experiences)));
    };
    postExperience();
    getExperiences();
  }, []);

  function updateUserLocation() {
    try {
      async function getPos() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              console.log("User location found map container", pos);
              await setUserLocation(pos);
            },
            () => {
              console.error("Error getting user location");
              throw new Error("Error getting user location");
            }
          );
        } else {
          // Browser doesn't support Geolocation
          console.error("User didn't allow location access");
          throw new Error("User didn't allow location access");
        }
        console.log("set user location", userLocation);
      }
      getPos();
      //locationTimer = setTimeout(updateUserLocation(), 5000);
    } catch (e) {
      console.error("Error getting user location: ", e);
    }
  }

  function displayUserMarker() {
    return (
      <Marker
        id={"userLocation"}
        options={{
          icon: {
            url: "./user_icon.png",
            borderRadius: "50%",
            scaledSize: { width: 32, height: 32 },
          },
        }}
        position={userLocation}
      />
    );
  }

  //   name: name,
  //   parent: parentId,
  //   pictures: pictures,
  //   rating: rating,
  //   tag: tag,
  //   timestamp: timestamp,
  function displayMarkers() {
    return myMarkers.map((mark, index) => {
      return (
        <Marker
          id={mark.parent}
          options={{
            icon: {
              url: "./phil.jpeg",
              borderRadius: "50%",
              scaledSize: { width: 32, height: 32 },
            },
          }}
          position={{
            lat: mark.latitude,
            lng: mark.longitude,
          }}
          onClick={() => {
            setOpenStory(mark);
          }}
        />
      );
    });
  }

  function handleClose() {
    setOpenStory(false);
  }
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
      className="map"
    >
      <Map
        google={props.google}
        zoom={13}
        styles={mapStyles.styles}
        initialCenter={userLocation}
        disableDefaultUI={true}
      >
        <Dialog onClose={handleClose} open={openStory}>
          <Story props={openStory}></Story>
        </Dialog>
        {displayMarkers()}
        {displayUserMarker()}
      </Map>
    </div>
  );
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCdEKu3k2avk5Y5Ru2EGSGzyyrAm2UcLpU",
})(MapContainer);
