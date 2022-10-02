import { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import mapStyles from "../src/mapStyles";
import getApiUrl from "../src/getApiUrl";
import Story from "../components/Story";
import Dialog from "@mui/material/Dialog";
import getDistance from "../src/getDistance";
function MapContainer(props) {
  const [myMarkers, setMyMarkers] = useState([]);
  const [openStory, setOpenStory] = useState(false);
  const [userLocation, setUserLocation] = useState(props.userLocation);
  const updateTime = 5;
  const [locationTimer, updateTimer] = useState(updateTime);
  let timer = setTimeout(function () {
    if (locationTimer > 0) {
      updateTimer(locationTimer - updateTime);
    } else {
      updateUserLocation();
      updateTimer(updateTime);
    }
  }, updateTime * 1000);
  const [ongoingAdventure, setOngoingAdventure] = useState(false);
  const [userRoute, updateUserRoute] = useState([props.userLocation]);
  const [adventureId, setAdventureId] = useState();
  const [lastExperienceLocation, setLastExperienceLocation] = useState(
    props.userLocation
  );
  const [lastExperienceTime, setLastExperienceTime] = useState(Date.now());

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
              console.log("Updated user location");
              await setUserLocation(pos);
              if (ongoingAdventure) {
                await updateUserRoute((current) => [...current, pos]);
                console.log("User routes", userRoute);
              }
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
            scaledSize: { width: 24, height: 24 },
          },
        }}
        position={userLocation}
      />
    );
  }

  function handleAdventureStart() {
    const getAdventureId = async () => {
      const res = await fetch(getApiUrl(`/api/adventures/generate`), {
        method: "GET",
      });
      const result = await res.json();
      await setAdventureId(result.id);
      await setOngoingAdventure(true);
    };
    getAdventureId();
  }

  function handleAdventureSubmission() {
    // POST request to add an adventure after filling out a form as well
  }

  function handleExperienceSubmission(
    name,
    rating,
    tag,
    experiencePictures,
    journeyPictures
  ) {
    // A new experience means the end to the previous journey
    const journeyBody = {
      parent: adventureId,
      distance: getDistance(userLocation, lastExperienceLocation),
      time: (Date.now() - lastExperienceTime).seconds(),
      pictures: journeyPictures,
    };
    const postJourney = async () => {
      const res = await fetch(getApiUrl(`/api/journeys/add`), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(journeyBody),
      });
      await setLastExperienceLocation(userLocation);
    };
    // POST request to add an experience after pressing the plus button while in an ongoing adventure and filling out a form
    const experienceBody = {
      name: name,
      latitude: userLocation.lat,
      longitude: userLocation.lng,
      parent: adventureId,
      rating: rating,
      tag: tag,
      pictures: experiencePictures,
    };
    const postExperience = async () => {
      const res = await fetch(getApiUrl(`/api/experiences/add`), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(experienceBody),
      });
      await setLastExperienceLocation(userLocation);
      await setLastExperienceTime(Date.now());
    };
    postJourney();
    postExperience();
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
