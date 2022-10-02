import { useEffect, useState, useRef } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import mapStyles from "../src/mapStyles";
import getApiUrl from "../src/getApiUrl";
import Story from "../components/Story";

import styles from "../styles/map.module.css";
import Dialog from "@mui/material/Dialog";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import Box from '@mui/material/Box';
import getDistance from "../src/getDistance";
import NavBar from "./NavBar";
import AdventureNavBar from "./AdventureNavBar";
import JourneySubmissionForm from "./JourneySubmissionForm";
function MapContainer(props) {
  const [friends, setFriends] = useState([]);
  const [radius, setRadius] = useState(null);
  const [tags, setTags] = useState([])
  const [myMarkers, setMyMarkers] = useState([]);
  const [openStory, setOpenStory] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
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
  const [ongoingAdventure, setOngoingAdventure] = useState(
    props.ongoingAdventure
  );
  const [userRoute, updateUserRoute] = useState([]);
  const [adventureId, setAdventureId] = useState();
  const [lastExperienceLocation, setLastExperienceLocation] = useState();
  const [lastExperienceTime, setLastExperienceTime] = useState(
    Date.now() / 1000
  );

  const getExperiences = async (query) => {
    const res = await fetch(
      getApiUrl(`/api/experiences/radar?${new URLSearchParams(query)}`),
      { method: "GET" }
    );
    const result = await res.json();
    setMyMarkers(Array.from(new Set(result.experiences)));
  };
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
    
    // postExperience();
    getExperiences(query);
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
      setAdventureId(result.id);
      setOngoingAdventure(true);
      setLastExperienceLocation(userLocation);
      updateUserRoute([userLocation]);
      setLastExperienceTime(Date.now());
    };
    getAdventureId();
  }

  function handleAdventureSubmission(title) {
    // POST request to add an adventure after filling out a form as well
    const body = {
      author: props.user.name,
      title: title,
      route: userRoute,
      adventureId: adventureId,
    };
    const postAdventure = async () => {
      const res = await fetch(getApiUrl(`/api/adventures/add`), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      setOngoingAdventure(false);
      setAdventureId(null);
      updateUserRoute(null);
      setLastExperienceLocation(null);
      setLastExperienceTime(null);
    };
    postAdventure();
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
      time: Date.now() / 1000 - lastExperienceTime,
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
  function handleCloseFilter() {
    setOpenFilter(false);
  }

  function handleFriendsChange(friends) {
    let friendList = friends.split(',')
    for (let i = 0; i < friendList.length; i ++) {
        friendList[i] = friendList[i].trim();
    }
    setFriends(friendList);
  }
  function handleTagsChange(tags) {
    let tagList = tags.split(',')
    for (let i = 0; i < tagList.length; i ++) {
        tagList[i] = tagList[i].trim();
    }
    setTags(tagList);
  }
  function handleRadiusChange(radius) {
    setRadius(parseFloat(radius))
  }
  function handleSubmit() {
    let filterQuery = {
        users: friends,
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        radius: radius,
        tag: tags,
      };
    getExperiences(filterQuery);
    setOpenFilter(false);

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
      {ongoingAdventure ? (
        <AdventureNavBar
          distance={getDistance(userLocation, lastExperienceLocation)}
          time={Date.now - lastExperienceTime}
        />
      ) : (
        <div />
      )}
      <JourneySubmissionForm />
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
        <Dialog onClose={handleCloseFilter} open={openFilter}>
        <FormControl>
      <Box component="form" noValidate autoComplete="off">
      <FormControl sx={{ width: '30ch' }}>
        <OutlinedInput placeholder="Friends (comma separated list)" onChange={(e)=>handleFriendsChange(e.target.value)}/>
        <OutlinedInput placeholder="Radius" onChange={(e)=>handleRadiusChange(e.target.value)}/>
        <OutlinedInput placeholder="Tags (comma separated list)" onChange={(e)=>handleTagsChange(e.target.value)}/>
      </FormControl>
      <div className={styles.SubmitButton} onClick={()=>handleSubmit()}>Submit</div>
    </Box>
</FormControl> 
        </Dialog>
        {displayMarkers()}
        {displayUserMarker()}
      </Map>
      <div className={styles.FilterContainer}>
      <div className={styles.FilterBox} onClick={()=>setOpenFilter(true)}>
      <FilterListRoundedIcon/>
      <div style={{paddingLeft: '10px'}}>Filter By</div>
      </div>
      </div>
      <NavBar
        ongoingAdventure={ongoingAdventure}
        handleExperienceSubmission={handleExperienceSubmission}
        handleAdventureStart={handleAdventureStart}
      />
    </div>
  );
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCdEKu3k2avk5Y5Ru2EGSGzyyrAm2UcLpU",
})(MapContainer);

{/* <FormControl>
      <Box component="form" noValidate autoComplete="off">
      <FormControl sx={{ width: '25ch' }}>
        <OutlinedInput placeholder="Please enter text" />
      </FormControl>
    </Box>
</FormControl> */}
