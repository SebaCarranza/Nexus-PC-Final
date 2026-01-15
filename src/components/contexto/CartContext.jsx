import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

const carritoInicial = JSON.parse(localStorage.getItem("carrito")) || [];

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(carritoInicial);

  const agregarAlCarrito = (producto, cantidad) => {

  if (producto.stock === 0) {
    toast.error("Producto sin stock");
    return;
  }

  const productoEnCarrito = carrito.find(
    prod => prod.id === producto.id
  );

  if (productoEnCarrito) {
    const cantidadTotal = productoEnCarrito.cantidad + cantidad;

    if (cantidadTotal > producto.stock) {
      toast.error("No hay stock suficiente");
      return;
    }

    const carritoActualizado = carrito.map(prod =>
      prod.id === producto.id
        ? { ...prod, cantidad: cantidadTotal }
        : prod
    );
    setCarrito(carritoActualizado);
  } else {
    setCarrito([...carrito, { ...producto, cantidad }]);
  }

  toast.success("Producto agregado al carrito");
};

  const eliminarProducto = (productoId) => {
    setCarrito(carrito.filter(prod => prod.id !== productoId));
  };

  const cantidadTotal = () => {
    return carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    const carritoActualizado = carrito.map(prod =>
      prod.id === id
        ? { ...prod, cantidad: nuevaCantidad }
        : prod
    );
    setCarrito(carritoActualizado);
  };

  const precioTotal = () => {
    return carrito.reduce(
      (acc, prod) => acc + prod.precio * prod.cantidad,
      0
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarProducto,
        cantidadTotal,
        actualizarCantidad,
        precioTotal,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
