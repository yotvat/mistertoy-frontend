import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service"
import { saveToy } from "../store/actions/toy.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { LabelSelect } from "../cmps/LabelSelect"


export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, checked,type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))

        if (type === 'checkbox') {
            if (checked) {
                setToyToEdit((prev) => ({ ...prev, inStock: true }))
            } else {
                setToyToEdit((prev) => ({ ...prev, inStock: false }))
            }
            return
        }
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.price) toyToEdit.price = 100
        saveToy(toyToEdit)
            .then(() => {
                // console.log(toyToEdit);
                showSuccessMsg('toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
            })
    }

    if (!toyToEdit) return <div> loading toy...</div>
    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>
            <form onSubmit={onSaveToy} >
                <label htmlFor="name">Name : </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                />

                <label htmlFor="price">Price : </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />

                <LabelSelect toyToEdit={toyToEdit}
                    setToyToEdit={setToyToEdit} />

                {/* <select multiple value={toyToEdit.labels} onChange={handleLabelChange}>
                    <option value="On-wheels">On-wheels</option>
                    <option value="Box-game">Box-game</option>
                    <option value="Art">Art</option>
                    <option value="Doll">Doll</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Battery-powered">Battery-powered</option>
                </select> */}

                <label htmlFor="inStock">in stock?</label>
                <input type="checkbox"
                    name="inStock"
                    id="inStock"
                    onChange={handleChange}
                    checked={toyToEdit.inStock}
                />
                <div>
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy"><button>Cancel</button></Link>
                </div>
            </form>
        </section>
    )
}