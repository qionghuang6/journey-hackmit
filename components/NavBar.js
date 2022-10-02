import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/map.module.css";
import Dialog from "@mui/material/Dialog";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

export default function NavBar(props) {
  // post state = false (show play button), true (show plus button)
  const [openFilter, setOpenFilter] = useState(false)
  const [ongoingAdventure, setongoingAdventure] = useState(
    props.ongoingAdventure
  );
  function handleCloseFilter() {
    setOpenFilter(false);
  }
  return (
    <div className={styles.NavBarContainer}>
      <div className={styles.NavBarBar}>
        <Link href="/feed">
          <MapRoundedIcon className={styles.PostIcon} />
          {/* <a className={styles.Link}>MAP</a> */}
        </Link>
        <Link href="/feed">
          <AccountCircleRoundedIcon className={styles.PostIcon} />
          {/* <a className={styles.Link}>PROFILE</a> */}
        </Link>
        <div className={styles.PostPlay}>
          {ongoingAdventure ? (
            <div
            onClick={()=>setOpenFilter(true)}
            //   onClick={props.handleExperienceSubmission}
            >
              <AddCircleIcon
                className={styles.PostAddIcon}
                sx={{ color: "rgb(222, 205, 170)", fontSize: 40 }}
              />
            </div>
          ) : (
            <div
              onClick={() => {
                setongoingAdventure(!ongoingAdventure);
                props.handleAdventureStart();
              }}
            >
              <PlayCircleFilledIcon
                className={styles.PostPlayIcon}
                sx={{ color: "rgb(222, 205, 170)", fontSize: 40 }}
              />
            </div>
          )}
        </div>
        <Link href="/feed">
          <ChatBubbleRoundedIcon className={styles.PostIcon} />
          {/* <a className={styles.Link}>FEED</a> */}
        </Link>
        <Link href="/feed">
          <SettingsRoundedIcon className={styles.PostIcon} />
          {/* <a className={styles.Link}>SETTINGS</a> */}
        </Link>
      </div>
      <Dialog onClose={handleCloseFilter} open={openFilter}>
        <FormControl>
      <Box component="form" noValidate autoComplete="off">
      <FormControl sx={{ width: '30ch' }}>
        <OutlinedInput placeholder="Name" />
        <OutlinedInput placeholder="Tag" />
        <OutlinedInput placeholder="Experience Pictures" />
        <OutlinedInput placeholder="Journey Pictures" />
      </FormControl>
      <div className={styles.SubmitButton} onClick={()=>setOpenFilter(false)}>Submit</div>
    </Box>
</FormControl> 
        </Dialog>
    </div>
  );
}
