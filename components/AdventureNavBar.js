import { useEffect, useState } from "react";
import Link from "next/link";
import StopIcon from "@mui/icons-material/Stop";
import styles from "../styles/map.module.css";

import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function AdventureNavBar(props) {
  // the stop icon is supposed to go in the middle
  return (
    <div className={styles.AdventureNavBarContainer}>
      <div className={styles.AdventureNavBarBar}>
        {props.distance && props.time ? (
          <div className={styles.AdventureNavBarText}> 
            <h4>Distance Traveled: {props.distance} mi</h4>
            <h4>Time Elapsed: {props.time / 60000} minutes</h4>
            <div>
              <h4> Adventure in progress! </h4>
            </div>
          </div>
        ) : (
          <div className={styles.AdventureNavBarText}>
            <div className={styles.center}>Adventure started! Click <AddCircleIcon
                sx={{ color: "rgb(222, 205, 170)", paddingLeft: '5px', paddingRight: '5px', fontSize: 30 }}/> to add an experience! Click</div>
                <div ><div
                className={styles.centerIcon}
                onClick={() => {
                  props.handleAdventureSubmission();
                }}
              >
                <StopIcon
              // className={styles.PostAddIcon}
              sx={{ color: "rgb(222, 205, 170)", fontSize: 40 }}
            /></div>
            to end your journey.
          </div>
          </div>
        )}

        

        
      </div>
    </div>
  );
}
