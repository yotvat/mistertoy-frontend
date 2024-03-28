import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadToys, removeToy, setFilterBy, setSortBy } from "../store/actions/toy.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { Link } from "react-router-dom"
import { ToyFilter } from "../cmps/ToyFilter"
import { ToyList } from "../cmps/ToyList"
import { ToySort } from "../cmps/ToySort"


export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load Toys!')
            })
    }, [filterBy, sortBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort(type) {
        setSortBy({ type, dir: -sortBy.dir })
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    return (
        <div className="toy-index">
            <main>
                <Link to="/toy/edit"><button className="add-btn">Add Toy</button></Link>
                <section className="filter-sort">

                    <ToyFilter
                        filterBy={filterBy}
                        onSetFilter={onSetFilter}
                    />
                    <ToySort
                        onSetSort={onSetSort}
                        sortBy={sortBy} />
                </section>
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                    />
                    : <div>Loading...</div>
                }
            </main>
        </div>
    )
} 