import React, { useEffect,useState } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import  AddIcon  from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import CallIcon from '@material-ui/icons/Call'
import MicIcon from '@material-ui/icons/Mic'
import HeadsetIcon from '@material-ui/icons/Headset'
import SettingsIcon from '@material-ui/icons/Settings'
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectuser } from "./features/userSlice";
import db, { auth } from "./firebase";

function Sidebar() {
  const user=useSelector(selectuser);
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot)=>
      setChannels(
        snapshot.docs.map((doc)=>({
          id:doc.id,
          channel:doc.data(),
        }))
      )
    );
    
  }, [])


  const handleAddChannel=()=>{
    const channelName=prompt("Enter a new channel name")
  if(channelName){
    db.collection('channels').add({
      channelName:channelName,
    })
  }
  }
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>clever programmers</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar_channelHeader">
          <div className="sidebar_header">
            <ExpandMoreIcon />
            <h4>Text Channel</h4>
          </div>
<AddIcon onClick={handleAddChannel} className="sidebar_addChannel"/>

        </div>
        <div className="sidebarChannelliste">

        {channels.map(({id, channel})=>(
         
 <SidebarChannel key={id} id={id} channelName={channel.channelName}/>
       
            
 ))}
         
</div>

      </div>
<div className="sidebarVoice">
    <SignalCellularAltIcon
    className="sidebar__voiceicon"
    fontSize="large"
    />
    <div className="sidebarvoiceInfo">
        <h3>Voice Connected</h3>
        <p>Stream</p>
    </div>
    <div className="sidebar__voiceIcons">
        <InfoOutlinedIcon/>
        <CallIcon/>
    </div>
</div>
<div className="sidebar_profile">
    <Avatar onClick={()=>{
      auth.signOut() 
    }} src={user.photo}/>
    <div className="sidebar_profileInfo">
        <h3>{user.displayName}</h3>
        <p>#{user.uid.substring(0,5)}</p>
    </div>

    <div className="sidebar_profileIcon">
        <MicIcon/>
        <HeadsetIcon />
        <SettingsIcon />
    </div>
</div>

    </div>
  );
}

export default Sidebar;
