import { db } from "./FireBaseConfig";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export const getProductos = () =>{

    const productosCollection = collection(db, "productos")

    return getDocs(productosCollection)
        .then((respuesta) => {
            // console.log(respuesta)
            const productosConFormato = []

            respuesta.docs.forEach(doc=>{
                productosConFormato.push(doc.data())
            })

            console.log(productosConFormato)

            return productosConFormato
        })
        .catch((error) => {
            console.log(error)
        })

    
}

export const getProductosByCategory = (categoria) =>{

    const productosCollection = collection(db, "productos")

    const filtro = query(productosCollection, where("categoria", "==", categoria))

    return getDocs(filtro)
        .then((respuesta) => {
            const productosConFormato = []

            respuesta.docs.forEach(doc=>{
                productosConFormato.push({
                    id: doc.id,
                    ...doc.data()
                })
            })

            return productosConFormato
        })
        .catch((error) => {
            console.log(error)
        })

    
}

export const getProductoById = (id) => {
  const productosRef = collection(db, "productos");

  const filtro = query(
    productosRef,
    where("id", "==", Number(id))
  );

  return getDocs(filtro).then((respuesta) => {
    if (respuesta.empty) return null;

    const docSnap = respuesta.docs[0];

    return {
        docId: docSnap.id,
        ...docSnap.data()
    };
  });
};



