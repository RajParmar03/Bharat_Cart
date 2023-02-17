import { START_LOADING,START_ERROR,STOP_LOADING,STOP_ERROR } from "./stateManager.actionType";

const InitalState = {
  isLoading: false,
  isError: false,
 
};

export const Reducer = (state = InitalState,action) => {
  const {type} = action;

  switch(type) {
    case START_LOADING : {
        return {...state , isLoading : true , isError : false};
    }
    case START_ERROR : {
        return {...state , isLoading : false , isError : true};
    }
    case STOP_LOADING : {
        return {...state , isLoading : false , isError : false};
    }
    case STOP_ERROR : {
        return {...state , isLoading : false , isError : false};
    }
    default : return state;
  }
};