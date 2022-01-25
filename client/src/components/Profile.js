import react, { useEffect, useState } from 'react';
import { User, UserTop, UserPlaylists } from 'react-spotify-api';
import { AiFillFire } from 'react-icons/ai';
import { 
  Spinner, 
  Text,
  Avatar,
  Flex,
  Grid,
  GridItem,
  Divider,
  Box,
  Container,
  Button,
  Image
} from '@chakra-ui/react';

const Profile = () => {
  const [view, setView] = useState('5');
  const [toRender, setToRender] = useState(true);
  const [which, setWhich] = useState('tracks');
  const [timeRange, setTimeRange] = useState('long_term');

  const handleView = (props) => {
    setView(props);
    setToRender(false);
  };

  const handleWhich = (props) => {
    setWhich(props);
    setToRender(false);
  };

  const handleTimeRange = (props) => {
    setTimeRange(props);
    setToRender(false);
  };

  useEffect(() => {
    if (toRender == false) {
      setToRender(true);
    }
  }, [toRender]);

  return (
    <Box borderRadius="10px" w="95vw" h="92vh" m="20px auto auto auto">
      <Box>
        <User>
          {(user) => !user.loading && user.data ? (
            <>
              <Flex justifyContent="center" alignItems="center" fontSize="24px" gap="10px">
                <Flex flexDirection="column" alignItems="center">
                  <Avatar size='2xl' src={user.data.images[0].url}/>
                  <Flex alignItems='center' gap='2px' fontSize="30px" fontWeight="600">
                    <Text>{user.data.display_name}</Text>
                  </Flex>
                  <Flex alignItems='center' gap='2px' lineHeight="1.1em" opacity="30%" fontWeight="300">
                    <Text>{user.data.email}</Text>
                  </Flex>
                  <Flex alignItems='center' gap='2px' lineHeight="1.1em" opacity="30%" fontWeight="300">
                    <Text>{user.data.followers.total} followers | {user.data.country}</Text>
                  </Flex>
                  <Flex alignItems='center' gap='2px'>
                    <Text></Text>
                  </Flex>
                </Flex>
              </Flex>
            </>
          ) : (
            null
          )}
        </User>
        <Flex justifyContent="center" m="20px" gap="10px">
          <Button onClick={() => handleWhich('artists')}>Artists</Button>
          <Button onClick={() => handleWhich('tracks')}>Tracks</Button>
          <Button onClick={() => handleView('5')}>5</Button>
          <Button onClick={() => handleView('10')}>10</Button>
          <Button onClick={() => handleView('25')}>25</Button>
          <Button onClick={() => handleView('50')}>50</Button>
          <Button onClick={() => handleTimeRange('short_term')}>4 weeks</Button>
          <Button onClick={() => handleTimeRange('medium_term')}>6 months</Button>
          <Button onClick={() => handleTimeRange('long_term')}>All</Button>
        </Flex>
        {toRender ? <>
          {which == 'tracks' ?
            <Flex direction="row" flexWrap="wrap" justifyContent="center">
              <UserTop type="tracks" options={{limit: view, time_range: timeRange}}>
                {(tracks) => !tracks.loading && tracks.data ? (
                  tracks.data.items.map((track, i) => (
                    <Flex position="relative" direction="column" w="200px" m="15px" textAlign="center">
                      <Image key={track.id} h="200px" w="200px" src={track.album.images[0].url}/>
                      <Text key={track.id} fontWeight="700" p="5px">{track.name}</Text>
                      <Text key={track.id} fontWeight="400">{track.artists[0].name}</Text>
                      <Box position="absolute" top="4px" right="4px" color="red.600" opacity="90%">
                        <AiFillFire size="45px" position="absolute" zIndex="100"/>
                        <Box top="15px" right="12px" position="absolute" justifyContent="center" textAlign="center" left="0" right="0">
                          <Text key={track.id} fontWeight="bold" color="white" zIndex="101">{track.popularity}</Text>
                        </Box>
                      </Box>
                      <Box position="absolute" top="160px" left="0px" opacity="90%">
                        <Text fontFamily="mono" key={track.id} bgColor="green.200" w="30px" borderRadius="0 5px 5px 0">{i+1}</Text>
                      </Box>
                    </Flex>
                  ))
                ) : (
                  null
                )}
              </UserTop>
            </Flex>
          :
          <Flex direction="row" flexWrap="wrap" justifyContent="center">
            <UserTop type="artists" options={{limit: view, time_range: timeRange}}>
              {(artists) => !artists.loading && artists.data ? (
                artists.data.items.map((artist, i) => (
                  <Flex position="relative" direction="column" w="200px" m="15px" textAlign="center">
                    <Image key={artist.id} h="200px" w="200px" objectFit="cover" src={artist.images[0].url}/>
                    <Text key={artist.id} fontWeight="700" p="5px">{artist.name}</Text>
                    <Box position="absolute" top="4px" right="4px" color="red.600" opacity="90%">
                      <AiFillFire size="45px" position="absolute" zIndex="100"/>
                      <Box top="15px" right="12px" position="absolute" justifyContent="center" textAlign="center" left="0" right="0">
                        <Text key={artist.id} fontWeight="bold" color="white" zIndex="101">{artist.popularity}</Text>
                      </Box>
                    </Box>
                    <Box position="absolute" top="160px" left="0px" opacity="90%">
                      <Text fontFamily="mono" key={artist.id} bgColor="green.200" w="30px" borderRadius="0 5px 5px 0">{i+1}</Text>
                    </Box>
                  </Flex>
                ))
              ) : (
                null
              )}
            </UserTop>
          </Flex>
          }
          </>
        :
          null
        }
      </Box>
    </Box>
  );
};

export default Profile;