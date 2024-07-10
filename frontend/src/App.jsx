import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar'
import Product from './pages/Product'
import Order from './pages/Order';
import Cart from './pages/Cart';
import ViewProduct from './pages/ViewProduct'
import Login from './Login'
import Signup from './Signup';
import { useState } from 'react';
// import { CartProvider } from './context/Cartcontext';
import UserContext from './context/UserContext';
import ProductContext from './context/ProductContext';
import CartContext from './context/CartContext';
import { Toaster } from 'sonner'


function App() {

  const [usersData, setUsersData] = useState(localStorage.getItem('userEmail') | null)
  const [productsData, setproductsData] = useState([]);
  const [cartData, setCartData] = useState([])


  return (
    <div className='App'>
      <ProductContext.Provider value={{ productsData, setproductsData }}>
        <UserContext.Provider value={{ usersData, setUsersData }}>
          <CartContext.Provider value={{ cartData, setCartData }}>
            <Navbar />
            <Toaster position="top-center" toastOptions={{
              className: 'my-toast',
            }} richColors expand={false} />
            <Routes>
              <Route path="/" element={<Product />} > </Route>
              <Route path="/login" element={<Login />} > </Route>
              <Route path="/signup" element={<Signup />} > </Route>
              <Route path="/orders" element={<Order />} > </Route>
              <Route path="/cart" element={<Cart />} > </Route>
              <Route path="/product/:id" element={<ViewProduct />} />
            </Routes>
          </CartContext.Provider>
        </UserContext.Provider>
      </ProductContext.Provider>
    </div>
  )
}

export default App
