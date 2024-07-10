import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import "./Order.css";

const Order = () => {
  const [order, setOrder] = useState([]);
  const { usersData } = useContext(UserContext);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    await axios
      .post("http://localhost:3001/showOrder", { userEmail: usersData })
      .then((res) => {
        setOrder(res.data);
        setloading(false)
        console.log("res of order", res);
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="Carts">
      <h2 className='px-5 py-2'>Order Details</h2>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center">
            {loading ? <h2>Loading !!!</h2> : ''}
          </div>
        </div>
      {!order?.length ? (
        <div className="row">
          <div className="col-12">Order lists are Empty !!!</div>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-11">
              {order?.length &&
                order?.map((ord) => (
                  <div>
                    {ord.userOrder.map((product) => (
                      <div className="row mt-2 mb-2 cart-row p-2 justify-content-center align-items-center">
                        <div className="col-3 col-sm-3 col-md-2 col-lg-2 col-xl-2">
                          <img
                            src={product?.image}
                            alt=""
                            className="cart-img"
                          />
                        </div>
                        <div className="col-8 col-sm-8 col-md-9 col-lg-9 col-xl-9">
                          <h2>{product?.title}</h2>
                          <p className="product-description">{product?.description}</p>
                          <p className="product-quantity">Quantity:{product?.quantity}</p>
                          <p className="product-quantity">${product?.price}</p>
                          <p className="product-price" >Total price: {product?.quantity * product?.price} </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Order;
