import { Link } from "react-router-dom";
import { ToyPreview } from "./ToyPreview";

export function ToyList({ toys, onRemoveToy, }) {

    return (
        <ul className="toy-list clean-list flex wrap justify-around">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div className="actions">
                        <Link to={`/toy/edit/${toy._id}`}>
                            <button>Edit</button>
                        </Link>
                        <Link to={`/toy/${toy._id}`}><button>Details</button></Link>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                    </div>
                </li>)}
        </ul>
    )
}