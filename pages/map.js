import { useEffect, useState } from 'react';
import getApiUrl from '../src/getApiUrl';
import MapContainer from '../components/MapContainer';
import NavBar from '../components/NavBar';

export default function map() {

    return (
        <>
        
        <MapContainer/>
        <NavBar/>
        </>
    )
}