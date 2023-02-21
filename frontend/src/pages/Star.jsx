import React from 'react';
import {ImStarEmpty , ImStarHalf , ImStarFull} from "react-icons/im";
import { Flex } from '@chakra-ui/react';

const Star = ({stars , size}) => {

    let ratingStars = Array.from({length : 5} , (elem , index) => {
        let number = index + 0.5;
        return (
            <span key={index}>
                {
                    stars >= index + 1?
                    <ImStarFull color='orange' size={size}/>
                    : stars >= number ?
                    <ImStarHalf color='orange' size={size}/>
                    :
                    <ImStarEmpty color='orange'size={size}/>
                }
            </span>
        )
    })

  return (
    <Flex>
        {ratingStars}
    </Flex>
  )
}

export default Star;