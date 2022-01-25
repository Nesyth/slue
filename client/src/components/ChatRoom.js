import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";
import { 
  Avatar,
  Box,
  Text,
  Button,
  Input,
  Flex
} from '@chakra-ui/react';

function ChatRoom({ socket, avatar, username, room, id, url }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messagesEndRef = useRef(null);

  const currentDate = () => {
    function addZero(date) {
      if (date < 10) {
        return "0" + date;
      } else {
        return date;
      }
    }

    const hours = addZero(new Date(Date.now()).getHours());
    const minutes = addZero(new Date(Date.now()).getMinutes());
    return hours + ":" + minutes;
  }

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        avatar: avatar,
        author: username,
        message: currentMessage,
        time: currentDate(),
        id: id,
        url: url
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" })
    // document.querySelector("#bully").scrollTop = document.querySelector("#bully").scrollHeight;
  }

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [messageList]);

  useEffect(() => {
    socket.emit("loaded_room", room);
  }, []);

  useEffect(() => {
    socket.on("output_messages", (data) => {
      setMessageList(data);
    });

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

  }, [socket]);
  
  return (
    <Box id="brixton" h="100%">
      <Box id="bully" h="calc(100vh - 101px)" overflowX="hidden" direction="column">
        {messageList.map((messageContent) => {
          return (
            <Box onLoad={scrollToBottom()}>
              <Message
                author={messageContent.author}
                avatar={messageContent.avatar}
                time={messageContent.time}
                message={messageContent.message}
                id={messageContent.id}
                url={messageContent.url}
              />
            </Box>
          );
        })}
        <Box ref={messagesEndRef}></Box>
      </Box>
      <Box display="flex" gap="4px" bottom="0" width="100%" background="white" overflowX="hidden">
        <Input
          h="40px"
          type="text"
          value={currentMessage}
          placeholder="Write here.."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <Button onClick={sendMessage}>&#9658;</Button>
      </Box>
    </Box>
  );
}

export default ChatRoom;

// return (
//   <Box id={username === messageContent.author ? "you" : "other"}>
//     <Box display="flex" alignItems="center" gap="10px">
//       <Avatar id="avatar" src={messageContent.avatar}/>
//       <Text id="author">{messageContent.author}</Text>
//       <Text id="time">{messageContent.time}</Text>
//     </Box>
//     <Text>{messageContent.message}</Text>
//   </Box>
// );