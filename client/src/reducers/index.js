import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { CODReducer } from "./CODReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  cart:cartReducer,
  COD:CODReducer,
});

export default rootReducer;
