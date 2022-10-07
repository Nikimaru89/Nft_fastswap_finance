import { applyMiddleware, compose, createStore, combineReducers } from "redux"
import thunk from "redux-thunk"
import faceReducer from "./reducer/faceReducer"

const rootReducer = combineReducers({
  face: faceReducer
});

const middleware = [thunk]
const composeEnhancers = compose(applyMiddleware(...middleware))

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers)
};

const store = configureStore();

export default store;
