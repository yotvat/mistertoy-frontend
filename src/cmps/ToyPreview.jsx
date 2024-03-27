import { Link } from "react-router-dom";


export function ToyPreview({ toy }) {
    return (
        <article>
            <h4>{toy.name}</h4>
            <img className="preview-img" src={`https://robohash.org/${toy.name}`} alt="" />
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p className={toy.inStock? "in-stock":'out-stock'}>{toy.inStock ? "In Stock!" : 'not available..'}</p>
        </article>
    )
}