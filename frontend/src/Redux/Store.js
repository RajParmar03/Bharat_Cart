import { legacy_createStore , combineReducers ,compose } from "redux";
import { authReducer } from "./authManager/authManager.reducer";
import { loadingReducer } from "./stateManager/stateManager.reducer";
import { userReducer } from "./userManager/userManager.reducer";

const rootReducer = combineReducers({
    loadingManager : loadingReducer,
    authManager : authReducer,
    userManager : userReducer
});

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(rootReducer , composer());