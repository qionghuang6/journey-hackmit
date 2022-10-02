import { useEffect, useState } from "react";
import getApiUrl from "../src/getApiUrl";
import MapContainer from "../components/MapContainer";

export default function Map() {
  const [userLocation, setUserLocation] = useState({ lat: 40.79, lng: -74 });
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
          console.error("User didn't allow location access");
          throw new Error("User didn't allow location access");
        }
        console.log("set user location", userLocation);
      }
      getPos();
    } catch (e) {
      console.error("Error getting initial user location: ", e);
    }
  }, []);

  return (
    <>
      <MapContainer userLocation={userLocation} />
    </>
  );
}
