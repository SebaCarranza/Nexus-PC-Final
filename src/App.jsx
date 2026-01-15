import './App.css'
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import Error404 from './components/404/Error404'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <NavBar/>
      <Toaster position="top-right" />
        <div className="page-container">
          <Routes>
            <Route path='/' element={<ItemListContainer />}/>
            <Route path='/categorias/:categoriaId' element={<ItemListContainer />}/>
            <Route path='/detalle/:id' element={<ItemDetailContainer/>}/>
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/404' element={<Error404/>}/>
            <Route path='*' element={<Error404/>}/>
          </Routes>
        </div>
    </>
  )
}

export default App
