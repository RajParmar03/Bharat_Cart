import { Button } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

let baseUrl = process.env.REACT_APP_BASEURL;


const currentYear = new Date().getFullYear();
const monthsArr = Array.from({ length: 12 }, (x, i) => {
    const month = i + 1;
    return month <= 9 ? '0' + month : month;
});
const yearsArr = Array.from({ length: 9 }, (_x, i) => currentYear + i);




const getCartList = async (token) => {
    let cartItems = await axios.get(`${baseUrl}/cart/get`, {
        headers: {
            Authorization: token
        }
    });
    return cartItems.data; 
};

const addToSold = async (cartItem, sellerId) => {
    console.log("in this function add to sold", cartItem, sellerId);
    let response = await axios.patch(`${baseUrl}/orderlist/addtosold/${sellerId}`, cartItem);
    return response.data;
};

const addToOrderList = async (token) => {
    console.log("this is token" , token);
    let response = await axios.patch(`${baseUrl}/orderlist/add`,{}, {
        headers: {
            Authorization: token
        }
    });
    return response.data;
};

export default function CForm({
    cardMonth,
    cardYear,
    onUpdateState,
    cardNumberRef,
    cardHolderRef,
    cardDateRef,
    onCardInputFocus,
    onCardInputBlur,
    cardCvv,
    children
}) {
    const [cardNumber, setCardNumber] = useState('');
    const [sellerObject, setSellerObjject] = useState({});
    const navigate = useNavigate();

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        onUpdateState(name, value);
    };


    const onCardNumberChange = (event) => {
        let { value, name } = event.target;
        let cardNumber = value;
        value = value.replace(/\D/g, '');
        if (/^3[47]\d{0,13}$/.test(value)) {
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
            // diner's club, 14 digits
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        } else if (/^\d{0,16}$/.test(value)) {
            // regular cc number, 16 digits
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
                .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
        }

        setCardNumber(cardNumber.trimRight());
        onUpdateState(name, cardNumber);
    };

    const onCvvFocus = (event) => {
        onUpdateState('isCardFlipped', true);
    };

    const onCvvBlur = (event) => {
        onUpdateState('isCardFlipped', false);
    };

    // const handlePayment2 = () => {
    //     if (cardHolderRef.current.value && cardHolderRef.current.value && cardDateRef.current.value) {
    //         let token = localStorage.getItem("token");

    //         handleProducts(token).then((res) => {
    //             alert(res.message);
    //             alert("Order Confirmed");
    //             navigate("/orderconfirmation");
    //         }).catch((error) => {
    //             console.log(error);
    //         });

    //     } else {
    //         alert("please provide all the data...");
    //     }

    // }

    const handlePayment = () => {
        if (cardHolderRef.current.value && cardHolderRef.current.value && cardDateRef.current.value) {
            let token = localStorage.getItem("token");

            getCartList(token).then((res) => {
                let sellerObj = {}
                res.forEach((elem) => {
                    if (sellerObj[elem.sellerId] === undefined) {
                        sellerObj[elem.sellerId] = [elem];
                    } else {
                        sellerObj[elem.sellerId] = [...sellerObj[elem.sellerId], elem];
                    }
                });
                console.log("this is seller obj", sellerObj);
                setSellerObjject(sellerObj);
            }).then(() => {
                addToOrderList(token).then((res) => {
                    alert(res.message);
                    alert("Order Confirmed");
                    navigate("/orderconfirmation");
                }).catch((error) => {
                    console.log(error);
                })
            }).catch((error) => {
                console.log(error);
            })
        } else {
            alert("please provide all the data...");
        }

    }

    useEffect(() => {
        for (let i in sellerObject) {
            addToSold(sellerObject[i], i).then((res) => {
                console.log(res.message);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [sellerObject]);

    // await addToSold(elem).then((res) => {
    //     console.log(res.message);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // .then(() => {
    //     addToOrderList(token).then((res) => {
    //         alert(res.message);
    //         alert("Order Confirmed");
    //         navigate("/orderconfirmation");
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    // })

    return (
        <div className="card-form" style={{border:"1px solid gray"}}>
            <div className="card-list">{children}</div>
            <div className="card-form__inner">
                <div className="card-input">
                    <label htmlFor="cardNumber" className="card-input__label">
                        Card Number
                    </label>
                    <input
                        type="tel"
                        placeholder='Enter Card Number'
                        name="cardNumber"
                        className="card-input__input"
                        autoComplete="off"
                        onChange={onCardNumberChange}
                        maxLength="19"
                        ref={cardNumberRef}
                        onFocus={(e) => onCardInputFocus(e, 'cardNumber')}
                        onBlur={onCardInputBlur}
                        value={cardNumber}
                    />
                </div>

                <div className="card-input">
                    <label htmlFor="cardName" className="card-input__label">
                        Card Holder Name
                    </label>
                    <input
                        type="text"
                        placeholder='Enter Card Holder Name'
                        className="card-input__input"
                        autoComplete="off"
                        name="cardHolder"
                        onChange={handleFormChange}
                        ref={cardHolderRef}
                        onFocus={(e) => onCardInputFocus(e, 'cardHolder')}
                        onBlur={onCardInputBlur}
                    />
                </div>

                <div className="card-form__row">
                    <div className="card-form__col">
                        <div className="card-form__group">
                            <label
                                htmlFor="cardMonth"
                                className="card-input__label"
                            >
                                Expiration Date
                            </label>
                            <select
                                className="card-input__input -select"
                                value={cardMonth}
                                name="cardMonth"
                                onChange={handleFormChange}
                                ref={cardDateRef}
                                onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                                onBlur={onCardInputBlur}
                            >
                                <option value="" disabled>
                                    Month
                                </option>

                                {monthsArr.map((val, index) => (
                                    <option key={index} value={val}>
                                        {val}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="cardYear"
                                className="card-input__input -select"
                                value={cardYear}
                                onChange={handleFormChange}
                                onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                                onBlur={onCardInputBlur}
                            >
                                <option value="" disabled>
                                    Year
                                </option>

                                {yearsArr.map((val, index) => (
                                    <option key={index} value={val}>
                                        {val}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="card-form__col -cvv">
                        <div className="card-input">
                            <label
                                htmlFor="cardCvv"
                                className="card-input__label"
                            >
                                CVV
                            </label>
                            <input
                                type="tel"
                                placeholder='Enter CVV'
                                className="card-input__input"
                                maxLength="4"
                                autoComplete="off"
                                name="cardCvv"
                                onChange={handleFormChange}
                                onFocus={onCvvFocus}
                                onBlur={onCvvBlur}
                                ref={cardCvv}
                            />
                        </div>
                    </div>
                </div>
                {/* <Button bg="rgb(0,181,181)" color="white" w="100%" colorScheme=>Submit</Button> */}
                <Button width={"100%"} style={{ margin: "1rem 0" }} size='lg' colorScheme={"whatsapp"} onClick={() => handlePayment()}>Payment</Button>

            </div>
        </div>
    );
}