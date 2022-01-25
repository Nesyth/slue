import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { User } from 'react-spotify-api';
import { 
  Button,
  Spinner,
  Text
} from '@chakra-ui/react';

const Main = () => {
  const handleLogout = () => {
    Cookies.remove("spotifyAuthToken");
    window.location.reload(false);
  }

  return (
    <>
      <Text>logged in!</Text>
      <User>
        {(user) =>
          !user.loading && user.data
            ? (
                <h1>{user.data.images[0].url}</h1>
              ) : (
                <Spinner/>
              )
        }
      </User>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
}

export default Main;