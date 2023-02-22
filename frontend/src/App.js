import logo from './logo.svg';
import './App.css';

import Navbar from "./components/Navbar";
import AllRoutes from './components/AllRoutes';
import Footer from './components/Footer';
import { Divider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SellerNavbar from './components/SellerNavbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { loginState } from './Redux/authManager/authManager.action';

let baseUrl = process.env.REACT_APP_BASEURL;

const getUser = async (token) => {
  let user = await axios.get(`${baseUrl}/user/getuser`, {
    headers: {
      Authorization: token
    }
  });
  return user.data;
}


function App() {
  const dispatch = useDispatch();

  const [isSeller , setIsSeller] = useState(false);

  useEffect(() => { 
    getUser(localStorage.getItem("token")).then((res) => {
      if(res.role === "seller"){
        dispatch(loginState(res));
        setIsSeller(true);
      }else{
        dispatch(loginState(res));
        setIsSeller(false);
      }
    }).catch((error) => {
      console.log(error);
    });
  },[]);

  return (
    <div className="App">
      {
        isSeller?
        <SellerNavbar />
        :
        <Navbar />
      }
      <Divider />
      <AllRoutes />
      <Divider />
      <Footer />
    </div>
  );
}

export default App;
