import {legacy_createStore,combineReducers} from 'redux'
import reducer from '../reducer'
//多个reducer时合并reducer
const reducers = combineReducers({
    reducer:reducer
})
const store = legacy_createStore(reducers)
export default store