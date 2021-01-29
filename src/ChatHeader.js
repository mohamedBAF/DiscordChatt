import EditLocationRoundedIcon from "@material-ui/icons/EditLocationRounded";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import NotificationsIcon  from "@material-ui/icons/Notifications";
import SendRoundedIcon  from "@material-ui/icons/SendRounded";
import HelpRoundedIcon  from "@material-ui/icons/HelpRounded";
import SearchRoundedIcon  from "@material-ui/icons/SearchRounded";
import React from "react";
import "./ChatHeader.css";
function ChatHeader({ channelName }) {
  console.log(channelName)
  return (
    <div className="chatheader">
      <div className="chatheader__left">
        <h3>
          <span className="chatheader__hash">#</span>
          {channelName}
          
        </h3>
      </div>
      <div className="chatheader__right">
        <NotificationsIcon />
        <EditLocationRoundedIcon />
        <PeopleAltRoundedIcon />
        <div className="chatheader__search">
            <input type="text" placeholder="Search"/>
            <SearchRoundedIcon />
        </div>
        <SendRoundedIcon />
        <HelpRoundedIcon />
      </div>
    </div>
  );
}

export default ChatHeader;
