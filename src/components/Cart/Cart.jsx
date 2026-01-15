import { useContext } from "react";
import { CartContext } from "../contexto/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import "./Cart.css";

const Cart = () => {
  const { carrito, vaciarCarrito, cantidadTotal, precioTotal } =
    useContext(CartContext);

  if (carrito.length === 0) {
    return <h2>🛒 El carrito está vacío</h2>;
  }

  return (
    <div className="cart-page">
      <div className="cart-products">
        <h2 className="cart-title">Mi carrito</h2>

        {carrito.map(prod => (
          <CartItem key={prod.id} producto={prod} />
        ))}
      </div>

      <div className="cart-summary">
        <h3>Resumen</h3>

        <p>{cantidadTotal()} producto(s)</p>

        <div className="cart-total">
          <span>Total</span>
          <strong>${precioTotal()}</strong>
        </div>

        <Link to="/checkout">
          <button className="btn-primary">
            Iniciar compra
          </button>
        </Link>

        <button className="btn-secondary" onClick={vaciarCarrito}>
          Vaciar carrito
        </button>
      </div>
    </div>
  );
};

export default Cart;
