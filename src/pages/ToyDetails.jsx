import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { useParams } from "react-router"
import { utilService } from "../services/util.service"
import { Link } from "react-router-dom"
// import ObjectId  from 'mongodb'



export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
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
    return (
        <section className="toy-details">
            <h2>{toy.name}</h2>
            <h3>Price: <span>${toy.price.toLocaleString()}</span></h3>
            <img src={`https://robohash.org/${toy.name}`} alt="" />
            {/* <h4>created at: {utilService.formatDate(toy.createdAt)}</h4> */}
            <h4>created at: {utilService.formatDate(utilService.extractTime(toy._id))}</h4>
            <h5>labels - {toy.labels.join(', ')}</h5>
            <p className={toy.inStock ? "in-stock" : 'out-stock'}>{toy.inStock ? `We have ${toy.name} in stock!` : `${toy.name} is not available..`}</p>

            <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link> &nbsp;
            <Link to={`/toy`}><button>Back</button></Link>
        </section>
    )
}