import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import UIReducer from "./UI/UIReducer";
import dataReducer from "./data/dataReducer";

const rootReducer = combineReducers({
    data: dataReducer, 
    UI: UIReducer,
    user: userReducer
})

export default rootReducer