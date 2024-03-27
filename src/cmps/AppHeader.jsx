import { Link, NavLink } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className="app-header full main-layout flex justify-between align-center">
            <Link to="/toy">
                <h1>Mister Toy</h1>
            </Link>
            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/about" >About</NavLink>
                <NavLink to="/dashboard" >Dashboard</NavLink>
                <NavLink to="/toy" >Toys</NavLink>
            </nav>
        </header>
    )
}
