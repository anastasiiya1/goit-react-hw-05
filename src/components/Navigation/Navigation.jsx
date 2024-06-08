import { NavLink } from "react-router-dom"
import css from './Navigation.module.css';
import clsx from 'clsx';

const getClassName = ( {isActive}) =>{
  return clsx(css.link, isActive && css.isActive)

}

function Navigation() {
  return (
	<>
	<nav className={css.nav}>
        <NavLink to="/" className={getClassName}>
          Home
        </NavLink>
        <NavLink to="/movies" className={getClassName}>
          Movies
        </NavLink>
      </nav>
	</>
  )
}

export default Navigation

