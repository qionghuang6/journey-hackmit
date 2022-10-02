import { useEffect, useState } from 'react';
import getApiUrl from '../src/getApiUrl';

import Dialog from '@mui/material/Dialog';
import styles from "../styles/map.module.css";
const images = ["./journey.jpeg", "./fish.jpeg", "./man-drowning.jpeg"]
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export default function Story(props) {
    const [image, setImage] = useState(0);
    let ratings = []
    for (let i=0; i < 5; i ++) {
        if (i < parseInt(props.props.rating)) {
            ratings.push(<StarIcon sx={{ color: "rgb(222, 205, 170)" }}></StarIcon>)
        }
        else {
            ratings.push(<StarOutlineIcon sx={{ color: "rgb(222, 205, 170)" }}/>)
        }
    }

    console.log("OIHOIH", props.props.name)
    return (
        <>
        <div className={styles.StoryContainer}>

        
        {/* <div className={styles.StoryAuthor}>
            {props.props.parent}
        </div> */}
        <div className={styles.StoryTitle}>
        <div><img src={"./phil.jpeg"} className={styles.StoryProfilePhoto}></img></div>
            <div>{props.props.name}</div>
            </div>
        <img className={styles.StoryPhoto} src={images[image]} onClick={() => {
            setImage((image + 1 )% images.length);
        }}></img>
        <div className={styles.StoryText}>
            {ratings}
        </div>
        <div className={styles.StoryTag}>
            {props.props.tag}
        </div>
        </div>
        </>
    )
}
