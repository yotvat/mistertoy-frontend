
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort
}

function query(filterBy = {}, sortBy = {}) {

    return storageService.query(STORAGE_KEY)
        .then(toys => {
            let toysToReturn = toys.slice()
            //filter
            if (filterBy.txt) {

                const regExp = new RegExp(filterBy.txt, 'i')
                toysToReturn = toysToReturn.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.maxPrice) {
                toysToReturn = toysToReturn.filter(toy => toy.price >= filterBy.maxPrice)
            }
            if (filterBy.inStock !== 'all') {
                toysToReturn = toysToReturn.filter(toy => toy.inStock.toString() === filterBy.inStock)
            }

            //sort
            if (sortBy.name) {
                toysToReturn = toysToReturn.sort((t1, t2) => (t1.name.localeCompare(t2.name)) * sortBy.name)
            }

            if (sortBy.price) {
                toysToReturn = toysToReturn.sort((t1, t2) => (t1.price - t2.price) * sortBy.price)
            }
            if (sortBy.created) {
                toysToReturn = toysToReturn.sort((t1, t2) => (t1.createdAt - t2.createdAt) * sortBy.created)
            }

            return toysToReturn
        })

    // .then(toys => {
    //     return toys
    // })

    // .then(toys => {
    //     if (!filterBy.name) filterBy.name = ''
    //     if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    //     const regExp = new RegExp(filterBy.txt, 'i')
    //     return toys.filter(toy =>
    //         regExp.test(toy.name) &&
    //         toy.price <= filterBy.maxPrice
    //     )
    // })



}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        toy.createdAt = new Date()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: null
    }
}


function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('Buzz lightyear'))
        toys.push(_createToy('Spider-man'))
        toys.push(_createToy('Darth-vader'))
        toys.push(_createToy('Ken'))
        toys.push(_createToy('Mister-ninja'))
        toys.push(_createToy('Bobo mcPopo the 3rd'))
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

function _createToy(name = '') {
    const toy = getEmptyToy()
    toy._id = utilService.makeId()
    toy.name = name
    toy.createdAt = Date.now()
    toy.inStock = utilService.getRandomBoolean()
    toy.price = utilService.getRandomIntInclusive(50, 900)
    toy.labels = utilService.generateRandomLabels()
    return toy
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', inStock: 'all' }
}
function getDefaultSort() {
    return { name: 1 }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {name: 'Barbie', price: 980}).then(x => console.log(x))


