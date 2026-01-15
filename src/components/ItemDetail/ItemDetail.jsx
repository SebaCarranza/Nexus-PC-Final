import { useContext, useState } from "react";
import ItemCount from "../ItemCount/ItemCount";
import { CartContext } from "../contexto/CartContext";
import "./ItemDetail.css";

const ItemDetail = ({ item }) => {
  const { agregarAlCarrito } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);
  const [added, setAdded] = useState(false);

  if (!item) {
    return (
      <div className="detail-wrapper">
        <p>Cargando producto...</p>
      </div>
    );
  }

  const handleAdd = () => {
  if (added) return; 

  agregarAlCarrito(item, cantidad);
  setAdded(true);
};

  const restar = () => {
    cantidad > 1 && setCantidad(cantidad - 1);
  };

  const sumar = () => {
    cantidad < item.stock && setCantidad(cantidad + 1);
  };




  return (
      <div className="item-detail">
        <h2>{item.name}</h2>

        <img src={item.img} alt={item.name} />

        <h2>{item.nombre}</h2>
        <h3>Precio: ${item.precio}</h3>
        <p>Stock: {item.stock}</p>

        {item.stock === 0 ? (
          <p className="sin-stock">Producto sin stock</p>
        ) : added ? (
          <p className="agregado-ok">Producto agregado al carrito ✅</p>
        ) : (
          <ItemCount
            cantidad={cantidad}
            sumar={sumar}
            restar={restar}
            añadir={handleAdd}
          />
        )}
      </div>
  );
};

export default ItemDetail;
