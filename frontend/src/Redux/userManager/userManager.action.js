import { ADDUSER, REMOVEUSER } from "./userManager.actionType"

export const addUserState = (user) => {
    return {type : ADDUSER , payload : user};
}

export const removeUserState = () => {
    return {type : REMOVEUSER};
}