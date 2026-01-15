import CartWidget from "../CartWidget/CartWidget";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";
const NavBar = () => {

    
  return (
    <header>
      <h1>
        <Link to="/">Nexus PC</Link>
      </h1>
      <CartWidget/>
      {/* <button onClick={handleCrearProducto}>crear producto</button> */}
      <nav>
        <ul>
          <li>
            <NavLink to="/categorias/1">Placas de Video</NavLink>
            </li>
          <li>
            <NavLink to="/categorias/2">Procesadores</NavLink>
          </li>
          <li>
            <NavLink to="/categorias/3">Memorias Ram</NavLink>
          </li>
          <li>
            <NavLink to="/categorias/4">Motherboards</NavLink>
          </li>
          <li>
            <NavLink to="/categorias/5">Fuentes</NavLink>
          </li>
          <li>
            <NavLink to="/categorias/6">Almacenamiento</NavLink>
          </li>
          <li>
            <NavLink to="/categorias/7">Gabinetes</NavLink>
          </li>
          <li>
            <NavLink to="/categorias/8">Monitores</NavLink>
          </li>
          <li>
            <NavLink to="/categorias/9">Periféricos</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default NavBar