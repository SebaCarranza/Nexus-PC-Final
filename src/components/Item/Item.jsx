import "./Item.css"
import { Link } from 'react-router-dom'

const Item = ({id, nombre, precio, img}) => {
  
  return (
    <div className="item-card">
      <img src={img} alt={nombre} />
      <p>{nombre}</p>
      <h1>Precio: ${precio}</h1>
      <button>
        <Link to={`/detalle/${id}`}>Ver Detalles</Link>
      </button>
    </div>
  )
}

export default Item