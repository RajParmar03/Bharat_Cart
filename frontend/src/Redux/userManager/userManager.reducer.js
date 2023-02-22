import { ADDUSER, REMOVEUSER } from "./userManager.actionType";

const initialState = {
    user : {},
}

export const userReducer = (state = initialState , action) => {
    const {type , payload} = action;
    switch(type){
        case ADDUSER : {
            return {...state, user : payload};
        }
        case REMOVEUSER : {
            return {...state , user : {}};
        }
        default : {
            return state;
        }
    }
}