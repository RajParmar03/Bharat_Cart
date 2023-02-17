import { START_LOADING,START_ERROR,STOP_LOADING,STOP_ERROR } from "./stateManager.actionType";

export const startLoading = () => {
    return {
        type : START_LOADING
    }
}

export const startError = () => {
    return {
        type : START_ERROR
    }
}

export const stopLoading = () => {
    return {
        type : STOP_LOADING
    }
}

export const stopError = () => {
    return {
        type : STOP_ERROR
    }
}