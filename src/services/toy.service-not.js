import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'




export const toyService = {
    query,
    getById,
    save,
    remove,
    // getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}


// function getEmptyToy() {
//     return {
//         name: '',
//         price: null,
//         labels: [],
//         createdAt: null,
//         inStock: null

//     }
// }

// function _createToys() {
//     let toys = utilService.loadFromStorage(STORAGE_KEY)
//     if (!toys || !toys.length) {
//         toys = []
//         toys.push(_createToy('Buzz lightyear'))
//         toys.push(_createToy('Spider-man'))
//         toys.push(_createToy('Darth-vader'))
//         toys.push(_createToy('Ken'))
//         toys.push(_createToy('Mister-ninja'))
//         toys.push(_createToy('Bobo mcPopo the 3rd'))
//         utilService.saveToStorage(STORAGE_KEY, toys)
//     }
// }

// function _createToy(name = '') {
//     const toy = getEmptyToy()
//     toy._id = utilService.makeId()
//     toy.name = name
//     toy.createdAt = Date.now()
//     toy.inStock = utilService.getRandomBoolean()
//     return toy
// }

function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}



