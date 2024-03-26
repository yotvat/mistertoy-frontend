import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className="app-header full main-layout flex justify-between align-center">
            <h1>Mister Toy</h1>
            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/about" >About</NavLink>
                <NavLink to="/toy" >toys</NavLink>
            </nav>
        </header>
    )
}
