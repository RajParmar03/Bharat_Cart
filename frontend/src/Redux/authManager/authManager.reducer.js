import { LOGIN, LOGOUT } from "./authManager.actionType";

const initialState = {
    isAuth : false,
}

export const authReducer = (state = initialState , action) => {
    const {type} = action;
    switch(type){
        case LOGIN : {
            return {...state , isAuth : true};
        }
        case LOGOUT : {
            return {...state , isAuth : false};
        }
        default : return state;
    }
}