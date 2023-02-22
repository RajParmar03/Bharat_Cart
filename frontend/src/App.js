import logo from './logo.svg';
import './App.css';

import Navbar from "./components/Navbar";
import AllRoutes from './components/AllRoutes';
import Footer from './components/Footer';
import { Divider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SellerNavbar from './components/SellerNavbar';

function App() {
  const userManager = useSelector(store => store.userManager);

  const [isSeller , setIsSeller] = useState(false);

  useEffect(() => { 
    setIsSeller(userManager.user.role === "seller"?true:false);
  },[userManager.user]);

  console.log("this is usermanager" , userManager.user);

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
