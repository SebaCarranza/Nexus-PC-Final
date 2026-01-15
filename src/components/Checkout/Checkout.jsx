import { useContext, useState } from "react";
import { CartContext } from "../contexto/CartContext";
import { db } from "../../FireBaseConfig";
import { collection, addDoc, getDoc, doc, Timestamp, writeBatch } from "firebase/firestore";
import { useForm } from "react-hook-form";
import confetti from "canvas-confetti";
import "./Checkout.css";



const Checkout = () => {
  const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);
  const [ordenId, setOrdenId] = useState(null);


  const {register, handleSubmit, formState: { errors }} = useForm();

  const lanzarConfeti = () => {
    confetti({
      particleCount: 180,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  const confirmarCompra = async (datos) => {
    const batch = writeBatch(db);
    const ordenesRef = collection(db, "ordenes");

    const orden = {
      comprador: datos,
      items: carrito.map(prod => ({
        id: prod.id,           
        nombre: prod.nombre,
        precio: prod.precio,
        cantidad: prod.cantidad
      })),
      total: precioTotal(),
      fecha: Timestamp.fromDate(new Date())
    };

    try {
      console.log("Carrito:", carrito);
      for (const prod of carrito) {

        if (!prod.docId) {
          throw new Error("Producto sin docId");
        }

        const productoRef = doc(db, "productos", prod.docId);
        const productoSnap = await getDoc(productoRef);

        

        if (!productoSnap.exists()) {
          throw new Error("Producto no existe");
        }

        const stockActual = productoSnap.data().stock;

        if (stockActual < prod.cantidad) {
          throw new Error(`Stock insuficiente de ${prod.nombre}`);
        }

        batch.update(productoRef, {
          stock: stockActual - prod.cantidad
        });
      }

      const ordenDoc = await addDoc(ordenesRef, orden);
        await batch.commit();

        lanzarConfeti(); 

        vaciarCarrito();
        setOrdenId(ordenDoc.id);

      } catch (error) {
        console.error(error);
        alert(error.message);
      }
  };

  if (ordenId) {
    return (
      <div className="checkout-page">
        <div className="checkout-container checkout-elegante compra-exitosa">
          <div className="check-animado">✓</div>

          <h2>¡Compra confirmada!</h2>
          <p>Gracias por tu compra</p>

          <p className="orden-id">
            Número de orden:
            <br />
            <strong>{ordenId}</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
  <div className="checkout-layout">

    <div className="checkout-elegante">
      <h2 className="checkout-title">Finalizar compra</h2>

      <form onSubmit={handleSubmit(confirmarCompra)} className="checkout-form">

        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              placeholder="Nombre"
              {...register("nombre", { required: true })}
            />
            {errors.nombre && <p className="error">Nombre requerido</p>}
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="error">Email requerido</p>}
          </div>
        </div>

        <div className="form-group">
          <input
            type="tel"
            placeholder="Teléfono"
            {...register("telefono", { required: true })}
          />
          {errors.telefono && <p className="error">Teléfono requerido</p>}
        </div>

        <button type="submit" className="btn-compra">
          Confirmar compra
        </button>
      </form>
    </div>

    <div className="checkout-resumen">
      <h3>Resumen de compra</h3>

      <ul>
        {carrito.map(prod => (
          <li key={prod.id}>
            <span>{prod.nombre} × {prod.cantidad}</span>
            <strong>${prod.precio * prod.cantidad}</strong>
          </li>
        ))}
      </ul>

      <div className="resumen-total">
        <span>Total</span>
        <strong>${precioTotal()}</strong>
      </div>
    </div>

  </div>
</div>
  );
};

export default Checkout;
