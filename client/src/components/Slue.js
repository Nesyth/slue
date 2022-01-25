import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Marquee from 'react-fast-marquee';
import { User, UserTop } from 'react-spotify-api';
import { 
  Button,
  Spinner,
  Text,
  Flex,
  Box,
  Image
} from '@chakra-ui/react';

const Slue = () => {
  return (
    <Box mt="8vh">
      <Flex fontSize='6xl' fontWeight='extrabold' lineHeight='0.9em' alignItems="center" flexDirection="column">
        <Text>Welcome to</Text>
        <Text bgGradient='linear(to-l, green.300, green.500)' bgClip='text'>SLUE.</Text>
      </Flex>
      <User>
        {(user) => !user.loading && user.data ? (
          <Flex mt="40px" fontSize='4xl' fontWeight='bold' lineHeight='0.9em' alignItems="center" justifyContent="center">
            <Text>Hey, {user.data.display_name.split(" ")[0]}. Take a look around.</Text>
          </Flex>
        ) : (
          null
        )}
      </User>
      <Box>
        <Marquee speed="4">
          <UserTop type="artists" options={{limit: 50, time_range: 'short_term'}}>
            {(artists) => !artists.loading && artists.data ? (
              artists.data.items.map(artist => (
                <Image key={artist.id} src={artist.images[0].url} mt="60px" objectFit="cover" w="100%" h="200px" overflow="hidden" opacity="60%"/>
              ))
            ) : (
              null
            )}
          </UserTop>
        </Marquee>
        <Marquee speed="6">
          <UserTop type="artists" options={{limit: 50, time_range: 'medium_term'}}>
            {(artists) => !artists.loading && artists.data ? (
              artists.data.items.map(artist => (
                <Image key={artist.id} src={artist.images[0].url} objectFit="cover" w="100%" h="200px" overflow="hidden" opacity="60%"/>
              ))
            ) : (
              null
            )}
          </UserTop>
        </Marquee>
        <Marquee speed="10" gradient="true">
          <UserTop type="artists" options={{limit: 50, time_range: 'long_term'}}>
            {(artists) => !artists.loading && artists.data ? (
              artists.data.items.map(artist => (
                <Image key={artist.id} src={artist.images[0].url} objectFit="cover" w="100%" h="200px" overflow="hidden" opacity="60%"/>
              ))
            ) : (
              null
            )}
          </UserTop>
        </Marquee>
      </Box>
    </Box>
  );
}

export default Slue;