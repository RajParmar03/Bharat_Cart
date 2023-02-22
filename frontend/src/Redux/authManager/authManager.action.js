import { LOGIN, LOGOUT } from "./authManager.actionType";

export const loginState = () => {
    return {type : LOGIN};
}

export const logoutState = () => {
    return {type : LOGOUT};
}