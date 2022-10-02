import { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'                         
import mapStyles from '../src/mapStyles';
import getApiUrl from '../src/getApiUrl';
import Story from '../components/Story';
import Dialog from '@mui/material/Dialog';
function MapContainer(props) {
    const [myMarkers, setMyMarkers] = useState([])
    const [openStory, setOpenStory] = useState(false);

    useEffect(() => {
        const body = { name: 'eating', latitude: 40.8, longitude: -74.01,parent: 'dylan', rating: '5', tag: 'restaurant', pictures:['./phil.jpeg']}
        const postExperience = async () => {
            const res = await fetch(
                getApiUrl(`/api/experiences/add`), 
                { method: 'POST' , headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }, body: JSON.stringify(body)}
              )
              console.log("RES", res)
        }

        const query = { users: ['test', 'hi'], longitude: -74, latitude: 40.79, tag: 'restaurant' }
        const getExperiences = async () => {
          const res = await fetch(
            getApiUrl(`/api/experiences/radar?${new URLSearchParams(query)}`), 
            { method: 'GET' }
          )
          const result = await res.json()
          setMyMarkers(Array.from(new Set(result.experiences)))
        }
        postExperience();
        getExperiences();
      }, [])
    
    //   name: name,
    //   parent: parentId,
    //   pictures: pictures,
    //   rating: rating,
    //   tag: tag,
    //   timestamp: timestamp,
    function displayMarkers() {                                        
                return myMarkers.map((mark, index) => {                
                    return <Marker id={mark.parent}  options={{icon: {url: "./phil.jpeg", borderRadius: "50%", scaledSize: { width: 32, height: 32 }}}} position={{                            
                        lat: mark.latitude,                                              
                        lng: mark.longitude                                                
                    }} 
            onClick={() => {
                setOpenStory(mark)
            }} />          
        })
    }

    function handleClose() {
        setOpenStory(false);
    }
        return (
            <div style={{
            position: "relative",
            width: "100%",
            height: "100vh"}} 
            className="map">
            <Map google={props.google} 
            zoom={13}
            styles={mapStyles.styles}
            initialCenter={{ lat: 40.79, lng: -74}}
            disableDefaultUI= {true}>
                <Dialog onClose={handleClose} open={openStory}><Story props={openStory}></Story></Dialog>
            {displayMarkers()}</Map>
            </div>
            );
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCdEKu3k2avk5Y5Ru2EGSGzyyrAm2UcLpU'
    })(MapContainer)

