import React from 'react';
import Cookies from 'js-cookie';
import { SpotifyApiContext } from 'react-spotify-api';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { FaSpotify } from 'react-icons/fa';
import { Routes, Route } from 'react-router-dom';
import { 
  Flex,
  Box,
  Center,
  Text,
  Button
} from '@chakra-ui/react';

import AuthPage from './components/AuthPage';
import Redirect from './components/Redirect';
import Main from './components/Main';
import Navbar from './components/Navbar.js';
import Profile from './components/Profile';
import Chat from './components/Chat';
import Slue from './components/Slue';

const App = () => {
    const [token, setToken] = React.useState(Cookies.get("spotifyAuthToken"))

  return (
    <>
      {token ? (
        <SpotifyApiContext.Provider value={token}>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Slue />} />
              <Route path="/redirect" element={<Redirect />} />
              <Route path="/main" element={<Main />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
        </SpotifyApiContext.Provider>
      ) : (
        <Center marginTop='10vh' display='flex' flexDirection='column'>
          <AuthPage/>
          <Flex columnGap='5px' alignItems='center' bgGradient='linear(to-l, gray.700, gray.800)' marginTop='1vh' textColor='white' padding='.5vh' borderRadius='.5vh' fontSize='xl'>
            <FaSpotify/>
            <Button as={SpotifyAuth} 
              noLogo='true'
              redirectUri='http://localhost:3000/redirect'
              clientID='710dc92c21e04f479388f97b7be6bc59'
              scopes={['user-read-private', 'user-read-email', 'user-top-read']}
              onAccessToken={(token) => setToken(token)} 
              width='128px' 
              height='32px'
            />
          </Flex>
        </Center>
      )}
    </>
  )
}
export default App