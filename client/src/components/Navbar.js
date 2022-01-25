import React from 'react';
import Cookies from 'js-cookie';
import { User } from 'react-spotify-api';
import { NavLink } from 'react-router-dom';
import { 
  Avatar, 
  Divider, 
  Flex, 
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react';

const Navbar = () => {
  const handleLogout = () => {
    Cookies.remove("spotifyAuthToken");
    window.location.reload(false);
  }

  return (
    <Box width="100%" background="white" zIndex="100">
      <Flex justifyContent='space-between' direction='row' fontSize='1.6em' marginRight='10px' marginLeft='10px' h="60px">
        <Box display='inline-flex' gap='25px' alignItems='center'>
          <NavLink to='/'>
            <Text bgGradient='linear(to-l, green.300, green.500)' bgClip='text' fontWeight='extrabold' fontSize='40px'>SLUE.</Text>
          </NavLink>
          <NavLink to='/profile' style={({ isActive }) => {
            return { borderBottom: isActive ? "1px solid green" : null };
          }}>Profile</NavLink>
          <NavLink to='/chat' style={({ isActive }) => {
            return { borderBottom: isActive ? "1px solid green" : null };
          }}>Chat</NavLink>
        </Box>
        <Box display='inline-flex' gap='15px' alignItems='center'>
          <User>
            {(user) =>
              !user.loading && user.data ? (
                <Menu>
                  <MenuButton as={Avatar} src={user.data.images[0].url}/>
                  <MenuList fontSize='.6em'>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : 
                <Avatar/>
            }
          </User>
        </Box>
      </Flex>
      <Divider/>
    </Box>
  );
};

export default Navbar;