import { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'                         
import mapStyles from '../src/mapStyles'
import getApiUrl from '../src/getApiUrl';
function MapContainer(props) {
    const [myMarkers, setMyMarkers] = useState([
        {id: 1, latitude: 40.710992, longitude: -74.008292},   
        {id: 2, latitude: 40.792917, longitude: -73.969497},
        {id: 3, latitude:  40.710992, longitude: -74.008292}
    ])
    useEffect(() => {
        const query = { users: ['test'], location: [40.2, -75], radius: 1, tag: 'restaurant' }
        const getExperiences = async () => {
          const res = await fetch(
            getApiUrl(`/api/experiences/radar?${new URLSearchParams(query)}`), 
            { method: 'GET' }
          )
        //   const result = await res.json()
        //   setMyMarkers(result)
          console.log("RESULTT", res)
        }
        getExperiences()
      }, [])
    
    function displayMarkers() {                                        
                return myMarkers.map((mark, index) => {                
                    return <Marker id={mark.id}  position={{                            
                        lat: mark.latitude,                                              
                        lng: mark.longitude                                                
                    }} 
            onClick={() => {
                
            }} />          
        })
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
            initialCenter={{ lat: 40.7812, lng: -73.9665}}
            disableDefaultUI= {true}>
            {displayMarkers()}</Map>
            </div>
            );
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCdEKu3k2avk5Y5Ru2EGSGzyyrAm2UcLpU'
    })(MapContainer)

