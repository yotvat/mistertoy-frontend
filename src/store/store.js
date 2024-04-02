import {
    combineReducers,
    compose,
    legacy_createStore as createStore
} from "redux"

import { userReducer } from "./reducers/user.reducer.js"
import { toyReducer } from "./reducers/toy.reducer.js"
import { reviewReducer } from "./reducers/review.reducer.js"

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
    reviewModule: reviewReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
