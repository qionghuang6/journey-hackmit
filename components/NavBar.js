import { useEffect, useState } from 'react';
import Link from "next/link";
import styles from "../styles/map.module.css";
import Dialog from '@mui/material/Dialog';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';

export default function NavBar(props) {
    // post state = false (show play button), true (show plus button)
    const [postState, setPostState] = useState(false);
    return (
        <div className={styles.NavBarContainer}>
            <div className={styles.NavBarBar}>
            <Link href="/map">
                <MapRoundedIcon className={styles.PostIcon}/>
            {/* <a className={styles.Link}>MAP</a> */}
          </Link>
          <Link href="/profile">
            <AccountCircleRoundedIcon className={styles.PostIcon}/>
          {/* <a className={styles.Link}>PROFILE</a> */}
        </Link>
        <div className={styles.PostPlay} onClick={() => {setPostState(!postState)}}>
            {postState ? <AddCircleIcon className={styles.PostAddIcon} sx={{ color: "rgb(222, 205, 170)", fontSize: 40}}/> : <PlayCircleFilledIcon className={styles.PostPlayIcon} sx={{ color: "rgb(222, 205, 170)", fontSize: 40 }}/>}
        </div>
        <Link href="/feed">
            <ChatBubbleRoundedIcon className={styles.PostIcon}/>
          {/* <a className={styles.Link}>FEED</a> */}
        </Link>
        <Link href="/settings">
            <SettingsRoundedIcon className={styles.PostIcon}/>
          {/* <a className={styles.Link}>SETTINGS</a> */}
        </Link>
            </div>
        </div>
    )
}