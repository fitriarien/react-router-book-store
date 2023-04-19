import { combineReducers } from "redux";
import bookReducer from "./bookReducers";
import IsLoginReducer from "./isLoginReducer";


const reducers = combineReducers({
  isLogin: IsLoginReducer,
  book: bookReducer
})

export default reducers;