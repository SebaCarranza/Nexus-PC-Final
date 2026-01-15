import { useEffect, useState } from 'react'
import { getProductoById } from '../../asyncmock'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams()

  useEffect(() => {
    setLoading(true)

    getProductoById(id)
      .then(respuesta => {
        setProducto(respuesta)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  return (
  <div className="detail-wrapper">
    {loading ? (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Cargando producto...</p>
      </div>
    ) : producto ? (
      <ItemDetail item={producto} />
    ) : (
      <p>Producto no encontrado</p>
    )}
  </div>
);
}

export default ItemDetailContainer