import { Box, Heading, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const NotFound = () => {
    return (
        <>
            <Box>
                <Box textAlign={"center"}>
                    <Image src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404" w={"25%"} m={"auto"} />
                    <VStack  backgroundColor={"yellow"} p={"20px"}>

                        <Heading borderBottom={"1px solid gray"} w={"20%"} m={"auto auto 30px auto"} p={"10px"}>404 Page</Heading>
                        <Text fontSize={"20px"}>The page you were looking for could not be found</Text>
                    </VStack>
                </Box>
            </Box>
        </>
    )
}

export default NotFound;