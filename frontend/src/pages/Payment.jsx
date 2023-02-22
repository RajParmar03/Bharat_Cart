import { Box, Button, Divider, Flex, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startError, startLoading, stopLoading } from '../Redux/stateManager/stateManager.action';


import Card from "./Card";
import CForm from "./CardForm";
import "./CardStyle.css";

let baseUrl = process.env.REACT_APP_BASEURL;


const initialState = {
  cardNumber: "#### #### #### ####",
  cardHolder: "FULL NAME",
  cardMonth: "",
  cardYear: "",
  cardCvv: "",
  isCardFlipped: false,
};

const getAddressOfUser = async (token) => {
  let addressList = await axios.get(`${baseUrl}/addresslist/getAddress`, {
    headers: {
      Authorization: token,
    }
  });
  return addressList.data;
}

const getUser = async (token) => {
  let user = await axios.get(`${baseUrl}/user/getuser`, {
    headers: {
      Authorization: token
    }
  });
  return user.data;
}

const getCartList = async (token) => {
  let cartItems = await axios.get(`${baseUrl}/cart/get`, {
    headers: {
      Authorization: token
    }
  });
  return cartItems.data;
};

const Payment = () => {

  const [state, setState] = useState(initialState);
  const [currentFocusedElm, setCurrentFocusedElm] = useState(null);
  const [address, setAddress] = useState({});
  const [user, setUser] = useState({});
  const [cartList, setCartList] = useState([]);
  const [amount, setAmount] = useState(0);



  const loadingManager = useSelector(store => store.loadingManager);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(startLoading());
    let token = localStorage.getItem("token");
    getAddressOfUser(token).then((res) => {
      res.map((elem) => {
        if (elem.isDefault) {
          setAddress(elem);
        }
      });
      dispatch(stopLoading());
    }).catch((error) => {
      dispatch(startError());
    });
  }, []);


  useEffect(() => {
    dispatch(startLoading());
    getUser(localStorage.getItem("token")).then((res) => {
      setUser(res);
      dispatch(stopLoading());
    }).catch((error) => {
      dispatch(startError());
    });
  }, []);

  useEffect(() => {
    dispatch(startLoading());
    let token = localStorage.getItem("token");
    getCartList(token).then((res) => {
      setCartList(res);
      dispatch(stopLoading());
    }).catch((error) => {
      dispatch(startError());
    });
  }, []);

  useEffect(() => {
    let total = cartList.reduce((acc, elem) => {
      return acc + elem.price * elem.quantity;
    }, 0);
    setAmount(total);
  }, [cartList]);

  const updateStateValues = useCallback(
    (keyName, value) => {
      setState({
        ...state,
        [keyName]: value || initialState[keyName],
      });
    },
    [state]
  );

  // References for the Form Inputs used to focus corresponding inputs.
  let formFieldsRefObj = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef(),
    cardCvv: useRef(),
  };

  let focusFormFieldByKey = useCallback((key) => {
    formFieldsRefObj[key].current.focus();
  });

  // This are the references for the Card DIV elements.
  let cardElementsRef = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef(),
  };

  let onCardFormInputFocus = (_event, inputName) => {
    const refByName = cardElementsRef[inputName];
    setCurrentFocusedElm(refByName);
  };

  let onCardInputBlur = useCallback(() => {
    setCurrentFocusedElm(null);
  }, []);

  return (
    <>
      {
        loadingManager.isLoading ?
          <Box m={"130px auto 30px auto"}>
            <Spinner
              thickness='5px'
              speed='0.5s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Box>
          :
          <Box h={"400px"} w={"600px"} p={"5px 10px"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" m={"130px auto 30px auto"}>
            <VStack alignItems={"left"} marginBottom={"10px"}>
              <Heading borderBottom={"1px solid gray"} paddingBottom={"10px"} marginBottom={"10px"}>Delivery Address :-</Heading>
              <Text>Name : {user.name}</Text>
              <Text>address : {address.houseNo}{", "}{address.street}{", "}{address.city}</Text>
              <Text>{address.state}{", "}{address.country}{", "}{address.pincode}</Text>
              <Text>phone no : {user.phone}</Text>
            </VStack>
            <hr />
            <Box marginTop={"10px"}>
              <VStack w={"100%"} h={"100%"}>
                <Heading borderBottom={"1px solid gray"} paddingBottom={"10px"} marginBottom={"10px"}>Cart Summary :-</Heading>
                <Text fontSize={"2xl"}>Total Product :- {cartList.length} </Text>
                <Text fontSize={"2xl"}>Total Amount :- {amount}</Text>
              </VStack>
            </Box>
          </Box>
      }
      <Box className="wrapper" >
        <CForm
          cardMonth={state.cardMonth}
          cardYear={state.cardYear}
          onUpdateState={updateStateValues}
          cardNumberRef={formFieldsRefObj.cardNumber}
          cardHolderRef={formFieldsRefObj.cardHolder}
          cardDateRef={formFieldsRefObj.cardDate}
          onCardInputFocus={onCardFormInputFocus}
          onCardInputBlur={onCardInputBlur}
        >
          <Card
            cardNumber={state.cardNumber}
            cardHolder={state.cardHolder}
            cardMonth={state.cardMonth}
            cardYear={state.cardYear}
            cardCvv={state.cardCvv}
            isCardFlipped={state.isCardFlipped}
            currentFocusedElm={currentFocusedElm}
            onCardElementClick={focusFormFieldByKey}
            cardNumberRef={cardElementsRef.cardNumber}
            cardHolderRef={cardElementsRef.cardHolder}
            cardDateRef={cardElementsRef.cardDate}
          ></Card>
        </CForm>
      </Box>
    </>
  );
}

export default Payment;



// import React, { useState, useRef, useCallback } from "react";
// import Card from "./card";
// import CForm from "./cardForm";
// import "./CardStyles.css";

// const initialState = {
//   cardNumber: "#### #### #### ####",
//   cardHolder: "FULL NAME",
//   cardMonth: "",
//   cardYear: "",
//   cardCvv: "",
//   isCardFlipped: false,
// };

// const CreditCard = () => {
//   const [state, setState] = useState(initialState);
//   const [currentFocusedElm, setCurrentFocusedElm] = useState(null);

//   const updateStateValues = useCallback(
//     (keyName, value) => {
//       setState({
//         ...state,
//         [keyName]: value || initialState[keyName],
//       });
//     },
//     [state]
//   );

//   // References for the Form Inputs used to focus corresponding inputs.
//   let formFieldsRefObj = {
//     cardNumber: useRef(),
//     cardHolder: useRef(),
//     cardDate: useRef(),
//     cardCvv: useRef(),
//   };

//   let focusFormFieldByKey = useCallback((key) => {
//     formFieldsRefObj[key].current.focus();
//   });

//   // This are the references for the Card DIV elements.
//   let cardElementsRef = {
//     cardNumber: useRef(),
//     cardHolder: useRef(),
//     cardDate: useRef(),
//   };

//   let onCardFormInputFocus = (_event, inputName) => {
//     const refByName = cardElementsRef[inputName];
//     setCurrentFocusedElm(refByName);
//   };

//   let onCardInputBlur = useCallback(() => {
//     setCurrentFocusedElm(null);
//   }, []);

//   return (
//     <div className="wrapper">
//       <CForm
//         cardMonth={state.cardMonth}
//         cardYear={state.cardYear}
//         onUpdateState={updateStateValues}
//         cardNumberRef={formFieldsRefObj.cardNumber}
//         cardHolderRef={formFieldsRefObj.cardHolder}
//         cardDateRef={formFieldsRefObj.cardDate}
//         onCardInputFocus={onCardFormInputFocus}
//         onCardInputBlur={onCardInputBlur}
//       >
//         <Card
//           cardNumber={state.cardNumber}
//           cardHolder={state.cardHolder}
//           cardMonth={state.cardMonth}
//           cardYear={state.cardYear}
//           cardCvv={state.cardCvv}
//           isCardFlipped={state.isCardFlipped}
//           currentFocusedElm={currentFocusedElm}
//           onCardElementClick={focusFormFieldByKey}
//           cardNumberRef={cardElementsRef.cardNumber}
//           cardHolderRef={cardElementsRef.cardHolder}
//           cardDateRef={cardElementsRef.cardDate}
//         ></Card>
//       </CForm>
//     </div>
//   );
// };

// export default CreditCard;