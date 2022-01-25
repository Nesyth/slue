import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { SpotifyAuthListener } from 'react-spotify-auth';
import { 
  Flex,
  Box,
  Center,
  Text,
  Button
} from '@chakra-ui/react';

import AuthPage from './AuthPage';

const Redirect = () => {
  useEffect(() => {
    window.location.replace('/');
  }, );

  return (
    <Center marginTop='10vh' display='flex' flexDirection='column'>
      <AuthPage/>
      <Text marginTop='1vh' paddingTop='.5vh' fontFamily='mono' fontWeight='light' textColor='gray.400' opacity='60%'>redirecting..</Text>
      <SpotifyAuthListener />
    </Center>
  );
}

export default Redirect;