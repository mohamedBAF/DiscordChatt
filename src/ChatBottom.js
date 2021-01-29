
import './ChatBottom.css'
import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import TouchAppOutlinedIcon from "@material-ui/icons/TouchAppOutlined";
import IconButton from "@material-ui/core/IconButton";
import GifIcon from "@material-ui/icons/Gif";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectuser } from "./features/userSlice";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import db from "./firebase";
import firebase from "firebase";





function ChatBottom() {
  const user = useSelector(selectuser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setinput] = useState("");
  const [messages, setmessages] = useState([]);
  

  const messagesEndRef = useRef();


  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("channels").doc(channelId).collection("messages").add({
      message: input,
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setinput("");
  };
  
    return (
        <div className="chat__input">
        <AddCircleIcon />
        <form>
          <input
            placeholder={`Message #${channelName}`}
            onChange={(e) => setinput(e.target.value)}
            value={input}
            disabled={!channelId}
          />
          <button
            onClick={sendMessage}
            type="submit"
            className="chat__inputButton"
          >
            Send Message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
        </div>
    )
}

export default ChatBottom
