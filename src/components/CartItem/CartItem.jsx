import { useContext } from "react";
import { CartContext } from "../contexto/CartContext";
import "./CartItem.css";

const CartItem = ({ producto }) => {
  const { eliminarProducto, actualizarCantidad } = useContext(CartContext);

  const sumar = () => {
    if (producto.cantidad < producto.stock) {
      actualizarCantidad(producto.id, producto.cantidad + 1);
    }
  };

  const restar = () => {
    if (producto.cantidad > 1) {
      actualizarCantidad(producto.id, producto.cantidad - 1);
    }
  };

  return (
    <div className="cart-item">
      <img src={producto.img} alt={producto.nombre} />

      <div className="cart-item-info">
        <h3>{producto.nombre}</h3>
        <p>Precio: ${producto.precio}</p>
      </div>

      <div className="cart-item-controls">
        <button onClick={restar}>−</button>
        <span>{producto.cantidad}</span>
        <button onClick={sumar}>+</button>
      </div>

      <div className="cart-item-subtotal">
        <strong>${producto.precio * producto.cantidad}</strong>
      </div>

      <button
        className="cart-item-delete"
        onClick={() => eliminarProducto(producto.id)}
      >
        ✕
      </button>
    </div>
  );
};

export default CartItem;
