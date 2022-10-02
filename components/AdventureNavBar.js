import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/map.module.css";
import StopIcon from "@mui/icons-material/Stop";

export default function AdventureNavBar(props) {
  // the stop icon is supposed to go in the middle
  return (
    <div className={styles.AdventureNavBarContainer}>
      <div className={styles.NavBarBar}>
        {props.distance && props.time ? (
          <div>
            <h4>Distance Traveled: {props.distance} mi</h4>
            <h4>Time Elapsed: {props.time / 60000} minutes</h4>
            <div>
              <h4> Adventure in progress! </h4>
            </div>
          </div>
        ) : (
          <div>
            <h3>
              Adventure started! Click the plus button to add an experience!
            </h3>
          </div>
        )}

        <StopIcon
          className={styles.PostAddIcon}
          sx={{ color: "rgb(222, 205, 170)", fontSize: 40 }}
        />

        <div
          className={styles.PostPlay}
          onClick={() => {
            props.handleAdventureSubmission();
          }}
        ></div>
      </div>
    </div>
  );
}
