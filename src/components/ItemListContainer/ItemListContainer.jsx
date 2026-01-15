import "./ItemListContainer.css";
import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams, Navigate } from "react-router-dom";
import { getProductos, getProductosByCategory } from "../../asyncmock";

const ItemListContainer = () => {

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoriaId } = useParams();

  const categoriasValidas = ["1","2","3","4","5","6","7","8","9"];

  if (categoriaId && !categoriasValidas.includes(categoriaId)) {
    return <Navigate to="/404" replace />;
  }

  useEffect(() => {
    setLoading(true);

    const consulta = categoriaId
      ? getProductosByCategory(Number(categoriaId))
      : getProductos();

    consulta
      .then((respuesta) => {
        setProductos(respuesta);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [categoriaId]);

  return (
    <div className="item-list-container">
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Cargando productos...</p>
        </div>
      ) : (
        <ItemList productos={productos} />
      )}
    </div>
  );
};

export default ItemListContainer;
