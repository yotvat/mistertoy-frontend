import { toyService } from "../../services/toy.service.js";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js";

import { ADD_MSG, ADD_TOY, REMOVE_MSG, REMOVE_TOY, SET_FILTER_BY, SET_IS_LOADING, SET_SORT_BY, SET_TOYS, TOY_UNDO, UPDATE_TOY } from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export function loadToys() {
    const filterBy = store.getState().toyModule.filterBy
    const sortBy = store.getState().toyModule.sortBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy, sortBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId: toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId: toyId })
    return toyService.remove(toyId)
        .then(() => {
            showSuccessMsg('Removed Toy!')
        })
        .catch(err => {
            store.dispatch({ type: TOY_UNDO })
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            // console.log('svaedToy',savedToy)
            return savedToy
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}


export async function addMsg(txt, toyId) {
    try {
        const msg = await toyService.addMsg({ txt }, toyId)
        store.dispatch({ type: ADD_MSG, toyId, msg })
        return msg
    } catch (err) {
        console.log('toy action -> Cannot add message', err)
        throw err
    }
}

export async function removeMsg(toyId, msgId) {
    try {
        const messageId = await toyService.removeMsg(toyId, msgId)
        store.dispatch({ type: REMOVE_MSG, toyId, msgId })
        return messageId
    } catch (err) {
        showErrorMsg(err)
        throw err
    }

}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}
export function setSortBy(sortBy) {
    store.dispatch({ type: SET_SORT_BY, sortBy })
}