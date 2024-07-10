import axios from 'axios'
import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import CartContext from '../context/CartContext'
import UserContext from '../context/UserContext'
import './Cart.css'


const Cart = () => {

  const { usersData } = useContext(UserContext)
  const {cartData, setCartData} = useContext(CartContext)
  const [loadingCart, setloadingCart] = useState(true);

  const getCart = async () => {

    await axios
      .post("http://localhost:3001/showcart", { email: usersData })
      .then((response) => {
        setCartData(response.data)
        setloadingCart(false)
        console.log("REs", response)
      })
      .catch((error) =>
        console.log(error)
      );
  }

  const updateCartQuantity = async (id, product) => {
    setloadingCart(true)
    await axios
      .put(`http://localhost:3001/updateCart/${id}`, product)
      .then((response) => {
        setloadingCart(false)
        getCart()
        // setCartData(response.data)
        console.log("REs", response)
      })
      .catch((error) => {
        // setPError(error.message);
        console.log(error)
      });
  }

  const deleteCart = async (id) => {
    await axios
      .delete(`http://localhost:3001/deleteCart/${id}`)
      .then((response) => {
        // setCartData(response.data)
        console.log("REs", response)  
        getCart()   
        toast.error("Product removed from cart")
      })
      .catch((error) => {
        // setPError(error.message);
        console.log(error.message)
      });
  }

  const handleConfirmOrder = async () => {

    const userData = { userEmail: usersData, order: cartData }
    await axios.post('http://localhost:3001/addOrder', userData)
      .then(res => {
        console.log("Res of Order", res)
        handleDeleteCart()
        // toast.success("Your order was placed successfully, Thank you")
      })
      .catch(err => console.log(err))
  }

  const handleDeleteCart = async () => {
    await axios.post('http://localhost:3001/deleteCart', { userEmail: usersData })
      .then(res => { console.log(res)
        toast.info('Your order was placed successfully, Thank you', {
          description: 'Please check in Order Details Page',
        })
        getCart()
      })
      .catch(err => console.log(err))
  }



  useEffect(() => {
    getCart()
    console.log(cartData)
  }, [])

  const handleCart = (sym, product) => {
    if (sym === '+') {
      product.quantity = product.quantity ? product.quantity + 1 : 1
      product.totalAmount = product.price * product.quantity
    } else {
      product.quantity = product.quantity <= 1 ? product.quantity :
        (product.quantity ? product.quantity - 1 : 1)
    }
    product.totalAmount = product.price * product.quantity

    updateCartQuantity(product._id, product)
  }

  return (
    <div className="Carts">
      <h2 className='px-5 py-2'>Cart</h2>
      {loadingCart ? <h2>Loading Cart !!!</h2> : ''}
      {!cartData?.length ?
        <div className="row">
          <div className="col-12 text-center">
            <h2>Cart is Empty !!! </h2></div>
        </div> :
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center" >
            <div className="col-11">
              {cartData?.length && cartData?.map((product) =>
                <div className="row mt-2 mb-2 cart-row p-2 justify-content-center align-items-center">
                  <div className="col-3 col-sm-3 col-md-2 col-lg-2 col-xl-2">
                    <img src={product?.image} alt="" className="cart-img" />
                  </div>
                  <div className="col-8 col-sm-8 col-md-9 col-lg-9 col-xl-9">
                    <h6>{product?.title}</h6>
                    <p>{product?.description}</p>
                    <div className="d-flex justify-content-between align-items-center" >

                      <div className="d-flex justify-content-center align-items-center quantity-btn">
                        <button className='btn btn-primary' onClick={() => handleCart('+', product)}>+</button>
                        <span className='p-3'>{product?.quantity}</span>
                        <button className='btn btn-primary' onClick={() => handleCart('-', product)}>-</button>
                      </div>
                      <button className='btn btn-danger' onClick={() => deleteCart(product._id)}>remove</button>
                    </div>
                    <div>

                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
          <div className='row justify-content-center mb-2 text-center'>
            <div className="col-5 text-center">
              <button className="btn btn-success text-center w-50" onClick={handleConfirmOrder}>Buy Now</button>
            </div>
          </div>
        </div>
      }
    </div>

  )
}

export default Cart
