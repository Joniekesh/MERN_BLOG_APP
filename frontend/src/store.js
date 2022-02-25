import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//User Auth
import authReducer from "./redux/reducers/userReducers";

//Profiles

const initialstate = {};

const middleware = [thunk];

const reducers = combineReducers({
	auth: authReducer,
});

const store = createStore(
	reducers,
	initialstate,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
