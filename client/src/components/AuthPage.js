import React from 'react';
import {
  Flex,
  Text
} from '@chakra-ui/react';

const AuthPage = () => {
  return (
    <>
      <Flex fontSize='6xl' fontWeight='extrabold' lineHeight='0.9em'>
        <Text marginRight='0.5vh'>Hear that?</Text>
        <Text bgGradient='linear(to-l, green.300, green.500)' bgClip='text'>SLUE.</Text>
      </Flex>
      <Text fontFamily='mono' fontWeight='light' textColor='gray.400' opacity='60%'>PRO PROJECT BY MIKOŁAJ JAKUBOWSKI</Text>
    </>
  );
}

export default AuthPage;