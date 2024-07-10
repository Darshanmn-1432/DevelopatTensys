import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { CartContext } from "../context/Cartcontext";
import './product.css'
import UserContext from "../context/UserContext";
import ProductContext from "../context/ProductContext";
import { toast } from "sonner";

const Product = () => {
  const [PError, setPError] = useState(false);
  const [loading, setLoading] = useState(true);

  // const {  } = useContext(CartContext);
  const { usersData } = useContext(UserContext)
  const { productsData, setproductsData } = useContext(ProductContext)

  const getProducts = async () => {
    await axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setproductsData(response.data)
        setLoading(false);
      })
      .catch((error) => {
        setPError(error.message);
      });
  }

  useEffect(() => {
    getProducts()
  }, []);



  const addToBag = async (product) => {
    const CartData = product
    CartData.user_email = usersData
    CartData.quantity = 1
    await axios.post('http://localhost:3001/addtocart', CartData)
      .then(res => {
        toast.success(`Product ${product.title} is added to cart`)
        console.log(res)
      })
      .catch(err => console.log(err))
  };

  return (
    <div className="product-list">

      {productsData.length ? <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          {productsData.map((product) => (
            <div key={product.id} className="mt-3 mb-3 ml-1 product-card col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3">
              <Link
                to={`/product/${product?.id}`}
                style={{ textDecoration: "none" }}
              >
                <img src={product?.image} alt={product?.title} />
                <p className="title">{product?.title}</p>
              </Link>
              <p className='product-desc'>{product?.description}</p>
              <p className="price-tag">${product?.price}</p>
              <br />
              {usersData ? <div>
                <button
                  className="pdp-add-to-bag"
                  onClick={() => addToBag(product)}
                >
                  ADD TO BAG
                </button>
              </div> : ''}
            </div>
          ))}
        </div></div>

        :
        <div>
          {PError ? <div>Error: {PError}</div> : ''}
          {loading ? <div> Loading !!! </div> : ''}
        </div>


      }
    </div>
  );
};

export default Product;
