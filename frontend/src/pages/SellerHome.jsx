import { Box, Button, Divider, Text } from '@chakra-ui/react';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import SellerNavbar from '../components/SellerNavbar';

const SellerHome = () => {

    const navigate = useNavigate();

    return (
        <>
            <SellerNavbar />
            <Box m={"100px auto 30px auto"} textAlign={"center"}>
                <Text fontSize={"30px"} marginBottom={"10px"}>Welcome To The Home Page Of Seller's Account.</Text>
                <Button marginBottom={"30px"} onClick={() => navigate("/sellerdashboard")}>GO TO YOUR DASH-BOARD</Button>
                <Divider />
                <Text marginTop={"30px"} fontSize={"20px"}>You Can Track All Your Selling Record Here...</Text>
                <Text fontSize={"20px"}>And Also Add New Product Or Modify Existing one.</Text>
                <Text fontWeight={"bold"}>But For that You Have To Create One Seller Account. You can create by clicking on this <span style={{color:"skyblue",cursor:'pointer',fontWeight:"normal" , fontSize:"20px" , textDecoration:"underline"}} onClick={() => navigate("/signup")}>Create Seller's Account.</span></Text>
                <Text fontWeight={"bold"}>If You Have Already An Account Then, You can Login by clicking on this <span style={{color:"skyblue",cursor:'pointer',fontWeight:"normal" , fontSize:"20px", textDecoration:"underline"}} onClick={() => navigate("/seller-login")}>Login to Seller's Account.</span></Text>
            </Box>
        </>
    )
}

export default SellerHome;