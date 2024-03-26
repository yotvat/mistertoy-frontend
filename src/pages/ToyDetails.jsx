import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { useParams } from "react-router"
import { utilService } from "../services/util.service"
import { Link } from "react-router-dom"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        console.log('toyId:', toyId)
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    console.log(toy);
    return (
        <section className="toy-details">
            <h2>toy name : {toy.name}</h2>
            <h3>Price: <span>${toy.price.toLocaleString()}</span></h3>
            <h4>created at:{utilService.formatDate(toy.createdAt)}</h4>
            <h5>labels: {toy.labels.join(', ')}</h5>
            {toy.inStock && <h4>We have {toy.name} in stock!</h4>}
            {!toy.inStock && <h4>not available</h4>}

            <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link> &nbsp;
            <Link to={`/toy`}><button>Back</button></Link>
        </section>
    )
}