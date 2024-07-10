import axios from "axios";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import "./ViewProduct.css";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productsData } = useContext(ProductContext)
  const [viewProduct, setViewProduct] = useState([]);

  // useEffect(() => {
  //   axios.get(`https://fakestoreapi.com/products/${id}`)
  //     .then((data) => setProduct(data)).catch((err) => console.log(err.message))
  // }, [id]);


  useEffect(() => {
    console.log("product", productsData);
    console.log("productsData.filter(x => x.id === id)",productsData.filter(x => x.id == id))
    setViewProduct(productsData.filter(x => x.id == id))
    console.log("viewProduct",viewProduct)
  },[id])

  return (
    !viewProduct.length ? <div>Loading...</div> : 
    <div className="container-fluid product-card-details">
      <div className="row justify-content-center align-items-center">
      <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 p-1 text-center">
        <h2>View Product</h2>
        </div>
        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 p-1">
        <button onClick = {() => navigate('/')} className="btn btn-outline-danger">Back</button>
        </div>
        </div>
      <div className="row justify-content-center align-items-center">
        <div className="col-8 col-sm-6 col-md-4 col-lg-4 col-xl-4 p-3">
          <img src={viewProduct[0].image} alt={viewProduct[0].title} className="img-fluid" />
        </div>
        <div className="col-8 col-sm-8 col-md-6 col-lg-6 col-xl-6">
          <p className="title">{viewProduct[0].title}</p>
          <p className="product-desc">{viewProduct[0].description}</p>
          <p className="product-cat">Category: {viewProduct[0].category}</p>
          <p className="price-tag">Price: ${viewProduct[0].price}</p>
        </div>
      </div>
    </div>
    );
};

export default ViewProduct;
