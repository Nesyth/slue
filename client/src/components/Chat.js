import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatRoom from "./ChatRoom";
import Marquee from "react-fast-marquee";
import { User } from "react-spotify-api";
import { Box, Input, Button, Flex, Tag, Text } from "@chakra-ui/react";

const socket = io.connect(process.env.REACT_APP_IO_SERVER);

const genres = [
  "acoustic",
  "afrobeat",
  "alt-rock",
  "alternative",
  "ambient",
  "anime",
  "black-metal",
  "bluegrass",
  "blues",
  "bossanova",
  "brazil",
  "breakbeat",
  "british",
  "cantopop",
  "chicago-house",
  "children",
  "chill",
  "classical",
  "club",
  "comedy",
  "country",
  "dance",
  "dancehall",
  "death-metal",
  "deep-house",
  "detroit-techno",
  "disco",
  "disney",
  "drum-and-bass",
  "dub",
  "dubstep",
  "edm",
  "electro",
  "electronic",
  "emo",
  "folk",
  "forro",
  "french",
  "funk",
  "garage",
  "german",
  "gospel",
  "goth",
  "grindcore",
  "groove",
  "grunge",
  "guitar",
  "happy",
  "hard-rock",
  "hardcore",
  "hardstyle",
  "heavy-metal",
  "hip-hop",
  "holidays",
  "honky-tonk",
  "house",
  "idm",
  "indian",
  "indie",
  "indie-pop",
  "industrial",
  "iranian",
  "j-dance",
  "j-idol",
  "j-pop",
  "j-rock",
  "jazz",
  "k-pop",
  "kids",
  "latin",
  "latino",
  "malay",
  "mandopop",
  "metal",
  "metal-misc",
  "metalcore",
  "minimal-techno",
  "movies",
  "mpb",
  "new-age",
  "new-release",
  "opera",
  "pagode",
  "party",
  "philippines-opm",
  "piano",
  "pop",
  "pop-film",
  "post-dubstep",
  "power-pop",
  "progressive-house",
  "psych-rock",
  "punk",
  "punk-rock",
  "r-n-b",
  "rainy-day",
  "reggae",
  "reggaeton",
  "road-trip",
  "rock",
  "rock-n-roll",
  "rockabilly",
  "romance",
  "sad",
  "salsa",
  "samba",
  "sertanejo",
  "show-tunes",
  "singer-songwriter",
  "ska",
  "sleep",
  "songwriter",
  "soul",
  "soundtracks",
  "spanish",
  "study",
  "summer",
  "swedish",
  "synth-pop",
  "tango",
  "techno",
  "trance",
  "trip-hop",
  "turkish",
  "work-out",
  "world-music",
];

genres.sort(() => 0.5 - Math.random());

function Chat() {
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const randomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  console.log(Math.floor(Math.random() * 16));

  return (
    <Box>
      {!showChat ? (
        <Flex justifyContent="center">
          <Flex direction="column" w="50vw">
            <Flex mt="20px" gap="10px">
              <Input
                type="text"
                placeholder="Room ID..."
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
              <Button onClick={joinRoom} type="submit">
                Join
              </Button>
            </Flex>
            <Marquee style="">
              <Flex m="10px" gap="10px">
                {genres.map((g) => (
                  <Tag opacity="60%">{g}</Tag>
                ))}
                ;
              </Flex>
            </Marquee>
          </Flex>
        </Flex>
      ) : (
        <User>
          {(user) =>
            !user.loading && user.data ? (
              <>
                <ChatRoom
                  socket={socket}
                  room={room}
                  username={user.data.display_name}
                  avatar={user.data.images[0].url}
                  id={user.data.id}
                  url={user.data.external_urls.spotify}
                />
              </>
            ) : null
          }
        </User>
      )}
    </Box>
  );
}

export default Chat;
