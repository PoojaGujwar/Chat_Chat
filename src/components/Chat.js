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
    return ()=>{
      socket.off('receive_message')
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
            <div className="message-field">
              <input
                type="text"
                placeholder="Types a message.."
                value={currentMessage}
                style={{ minWidth: "500px" }}
                onChange={(e) => setCurrentMessage(e.target.value)}
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
