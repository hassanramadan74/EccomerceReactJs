import React, { useContext, useEffect, useState } from "react";
import Style from "./Products.module.css";
import axios from "axios";
import { Audio } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import {Helmet} from "react-helmet";
import Loading from 'react-fullscreen-loading';

import { WishList } from "../../Context/WishList";
export default function Products() {
  let { addToCart , cartNumber , updateItem} = useContext(CartContext);
  let [Products, setProducts] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  let { addToWishlist } = useContext(WishList);

  async function addToWishlistProduct(id) {
    let response = await addToWishlist(id);
    if (response.data.status === "success") {
      toast.success("Added to wishlist", {
        icon: "👏",
        position: "top-right",
      });
    } else {
      toast.error("Failed");
    }
  }

  async function addToCartProduct(id) {
    let response = await addToCart(id);
    if (response.data.status === "success") {
      toast.success("Added to cart");
      updateItem({cartNumber});

    } else {
      toast.error("Failed");
    }
  }

  async function getAllProducts() {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    setProducts(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getAllProducts();
  }, []);
  return (

    <>
                <Helmet>
                <title> Products</title>
              
            </Helmet>
      <div className="container py-4">
        <h2> Products</h2>

        <div className="row">
          {isLoading ? (
 <Loading loading background="#3B3B3B" loaderColor="#D0D0D0" />
          ) : (
            <>
              {Products.map((product) => (
                <div key={product.id} className="col-md-2 cursor-pointer">
                  <div className="product p-3">
                    <Link to={`/SpecificProducts/${product.id}`}>
                      <img
                        className="w-100"
                        src={product.imageCover}
                        alt={product.title}
                      />
                      <span className="text-main fw-bolder font-sm">
                        {product.category.name}
                      </span>
                      <h3 className="h6">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div className="d-flex justify-content-between mx-1">
                        <span>{product.price} EGP</span>
                        <span>
                          <i className="fas fa-star rating-color"></i>{" "}
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    <div className="d-flex justify-content-end align-items-center">
                      <i
                        onClick={() => addToWishlistProduct(product.id)}
                        class="fa-solid fa-heart heart-icon "
                      ></i>
                    </div>
                    <button
                      onClick={() => addToCartProduct(product.id)}
                      className="bg-main btn text-white w-100 btn-sm mt-2"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
