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
import ChatBottom from './ChatBottom'

const getStorageTheme = () => {
  let theme = "light-theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

function Chat() {
  const user = useSelector(selectuser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setinput] = useState("");
  const [messages, setmessages] = useState([]);
  const [theme, setTheme] = useState(getStorageTheme());

  const messagesEndRef = useRef();

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
}, [channelId]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  console.log(user);
  return (
<div className="all">
      <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="icona">
        <IconButton style={{ backgroundColor: "#bbbbbb" }}>
          <TouchAppOutlinedIcon fontSize="large" onClick={toggleTheme} />
        </IconButton>
      </div>
      <div className="chat__message">
        {messages
          .map((message) => (
              <Message
              message={message.message}
              timestamp={message.timestamp}
              user={message.user}
              />
              ))
              .reverse()}
      </div>
      <div ref={messagesEndRef} />
     
      
    </div>
      <ChatBottom/>
    </div>
    );
}

export default Chat;
