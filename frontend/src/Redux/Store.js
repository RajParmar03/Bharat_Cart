import { legacy_createStore } from "redux";
import { Reducer } from "./stateManager/stateManager.reducer";

export const store = legacy_createStore(Reducer);