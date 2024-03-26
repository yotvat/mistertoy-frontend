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

    // console.log(filterByToEdit);
    return (
        <section className="toy-filter full main-layout">
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="By name"
                    value={filterByToEdit.name}
                    onChange={handleChange}
                />
                
                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />
                <label htmlFor="inStock">In stock</label>
                <select onChange={handleChange} name="inStock" id="stock">
                    <option value="all">all</option>
                    <option value={true}>In stock</option>
                    <option value={false}>Unavailable</option>
                </select>

            </form>

        </section>
    )
}