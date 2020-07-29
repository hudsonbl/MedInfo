import {createStore} from 'redux';
import rootReducer from '../reducers';

function saveToLocalStorage(state){
    try{
        const serializeState = JSON.stringify(state)
        localStorage.setItem('state', serializeState)
    } catch(e) {
        // in incognito this will throw
        console.log(e) 
    }
}

function loadFromLocalStorage() {
    try{
        const serializedState = localStorage.getItem('state')
        if(serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch (e) {
        // in incognito this will throw
        console.log(e)
        return undefined 
    }
}

const persistedState = loadFromLocalStorage()

const store = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store