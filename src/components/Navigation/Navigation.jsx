import { NavLink } from "react-router-dom"

function Navigation() {
  return (
	<>
	<nav>
        <NavLink to="/" end activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/movies" activeClassName="active">
          Movies
        </NavLink>
      </nav>
	</>
  )
}

export default Navigation