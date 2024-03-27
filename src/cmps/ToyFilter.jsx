import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    return (
        <section className="toy-filter-container flex full">
            <h1>Filter by</h1>
            <form >
                <label htmlFor="txt">Name: </label>
                <input type="text"
                    id="txt"
                    name="txt"
                    placeholder="By text"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />
                <label htmlFor="maxPrice"> Max price: </label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />
                <label htmlFor="inStock">In stock: </label>
                <select onChange={handleChange} name="inStock" id="stock">
                    <option value="all">all</option>
                    <option value={true}>In stock</option>
                    <option value={false}>Unavailable</option>
                </select>

            </form>

        </section>
    )
}