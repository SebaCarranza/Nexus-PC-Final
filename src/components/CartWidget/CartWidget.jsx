import { useContext } from 'react';
import "./CartWidget.css";
import { CartContext } from '../contexto/CartContext';
import { Link } from 'react-router-dom';

const CartWidget = () => {
  const { cantidadTotal } = useContext(CartContext);

  const total = cantidadTotal();

  return (
    <Link to="/cart" className="cart-container">
      <img
        className="imagen"
        src="/shopping-cart.png"
        alt="icono de carrito"
      />

      {total > 0 && (
        <span className="cart-count">
          {total}
        </span>
      )}
    </Link>
  );
};

export default CartWidget;
