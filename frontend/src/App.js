import logo from './logo.svg';
import './App.css';

import Navbar from "./components/Navbar";
import AllRoutes from './components/AllRoutes';
import Footer from './components/Footer';
import { Divider } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Divider />
      <AllRoutes />
      <Divider />
      <Footer />
    </div>
  );
}

export default App;
