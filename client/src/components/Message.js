import React from "react";
import { User } from 'react-spotify-api';
import MessagePopup from "./MessagePopup";
import { 
  Box,
  Avatar,
  Text,
  Spinner,
  Flex,
  Center,
  Link
} from "@chakra-ui/react";

const Message = ({ author, time, avatar, message, id, url }) => {
  return (
    <Box m="0 1% 0 1%">
      <User>
        {(user) =>
          !user.loading && user.data ? (
              user.data.id == id ? (
                <Flex p="0.4em" justifyContent="flex-end">
                  <Flex bgColor="green.400" shadow="sm" color="white" transition="0.1s ease-in-out" _hover={{ bgColor: "green.500" }} borderRadius="15px">
                    <Flex flexDirection="column">
                      <Flex alignItems="center" gap="10px" mt="4px" pl="10px" pr="10px" fontSize="14px" fontWeight="300" justifyContent="flex-end">
                        <Text id="author">{author}</Text>
                        <Text id="time">{time}</Text>
                      </Flex>
                      <Text m="8px 16px 8px 8px" fontSize="17px" textAlign="right" maxW="85vw">{message}</Text>
                    </Flex>
                    <Flex alignItems="center">
                      <Link href={url} isExternal>
                        <Avatar id="avatar" src={avatar} mr="8px"cursor="pointer"/>
                      </Link>
                    </Flex>
                  </Flex>
                </Flex>
              ) : (
                <Flex p="0.4em">
                  <Flex bgColor="gray.100" shadow="sm" transition="0.1s ease-in-out" _hover={{ bgColor: "gray.200" }} borderRadius="15px">
                    <Flex alignItems="center">
                      <Link href={url} isExternal>
                        <Avatar id="avatar" src={avatar} mr="8px"cursor="pointer"/>
                      </Link>
                    </Flex>
                    <Flex flexDirection="column">
                      <Flex alignItems="center" gap="10px" mt="4px" pl="10px" pr="10px" fontSize="14px" fontWeight="300">
                        <Text id="author">{author}</Text>
                        <Text id="time">{time}</Text>
                      </Flex>
                      <Text m="8px 8px 8px 16px" fontSize="17px" maxW="85vw">{message}</Text>
                    </Flex>
                  </Flex>
                </Flex>
              )
          ) : (
            null
          )}
      </User>
    </Box>
  );
}

export default Message;

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