import axios from "axios";
import React, { useEffect, useState } from "react";
import Message from "./Message";
import "./chat.css"
import {io} from "socket.io-client"

const socket = io(`https://chat-chat-if63.onrender.com`)

export default function Chat({ user }) {
  const [users, setUsers] = useState([]);
  const [messages, setMessage] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
<<<<<<< HEAD
  const [isTyping, setIsTyping] = useState(false);
  const typingRef = React.useRef(null);

=======
>>>>>>> f7f961c47bd6db5acb81c0aabade46e3caff6ff7

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios(
          `https://chat-chat-if63.onrender.com/users`,
          { params: { currentUser: user.username } }
        );
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();

    socket.on("receive_message",(data)=>{
      if(data.sender === currentChat || data.receiver === currentChat){
        setMessage((prev)=>[...prev,data])
      }
    })
<<<<<<< HEAD
    socket.on("typing",({sender})=>{
      if(sender === currentChat){
        setIsTyping(true)
      }
    })
    socket.on("stop_typing",({sender})=>{
      if(sender === currentChat){
        setIsTyping(false);
      }
    })
    return ()=>{
      socket.off('receive_message')
      socket.off("typing")
      socket.off("stop_typing")
=======
    return ()=>{
      socket.off('receive_message')
>>>>>>> f7f961c47bd6db5acb81c0aabade46e3caff6ff7
    }
  }, [currentChat]);

  const fetchMessage = async (receiver) => {
    try {
      const { data } = await axios.get(
        `https://chat-chat-if63.onrender.com/messages`,
        { params: { sender: user.username, receiver } }
      );
      console.log(data);
      setMessage(data);
      setCurrentChat(receiver);
    } catch (error) {
      console.error("Error fetching message", error);
    }
  };

  const sendMessage = () => {
    const messageData ={
      sender:user.username,receiver:currentChat,message:currentMessage
    }
    console.log(messageData)
    socket.emit("send_message",messageData)
    setMessage((prev)=>[...prev,messageData])
    setCurrentMessage('')
  };

<<<<<<< HEAD
  const handleTyping =(e)=>{
    setCurrentMessage(e.target.value)

    socket.emit("typing",{
      sender:user.username,
      receiver:currentChat
    })
    if(typingRef.current){
      clearTimeout(typingRef.current)
    }
    typingRef.current = setTimeout(()=>{
      socket.emit("stop_typing",{
        sender: user.username,
        receiver: currentChat
      })
    },1000)
  }

=======
>>>>>>> f7f961c47bd6db5acb81c0aabade46e3caff6ff7
  return (
    <div className="chat-container">
      <h1>Welcome, {user.username}</h1>
      <div className="chat-list">
        <h3>Chats</h3>
        {users.map((u) => (
          <div
          className={`chat-user ${currentChat === u.username?"active":""}`}
           onClick={() => fetchMessage(u.username)}>{u.username}</div>
        ))}
        </div>
        {currentChat && (
          <div className="chat-window">
            <h5>You are chatting with {currentChat}</h5>
            <Message messages={messages} user={user} />
<<<<<<< HEAD
            {isTyping && (
              <p style={{fontSize:"12px",color:"gray"}}>{currentChat} is typing</p>
            )}
=======
>>>>>>> f7f961c47bd6db5acb81c0aabade46e3caff6ff7
            <div className="message-field">
              <input
                type="text"
                placeholder="Types a message.."
                value={currentMessage}
                style={{ minWidth: "500px" }}
<<<<<<< HEAD
                onChange={handleTyping}
=======
                onChange={(e) => setCurrentMessage(e.target.value)}
>>>>>>> f7f961c47bd6db5acb81c0aabade46e3caff6ff7
              />
              <button className="btn-primary" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    
  );
}
