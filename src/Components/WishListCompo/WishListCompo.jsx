import React, { useContext, useEffect , useState} from 'react';
import Style from './WishListCompo.module.css';
import { WishList } from '../../Context/WishList';
import {Helmet} from "react-helmet";
import { Audio } from "react-loader-spinner";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import Loading from 'react-fullscreen-loading';

export default function WishListCompo() {
 let {getLoggedWishList , removeFromWishlist} =  useContext(WishList)
 let { addToCart , cartNumber , updateItem} = useContext(CartContext);
 const [WishProducts, setWishProducts] = useState([])
 let [isLoading, setIsLoading] = useState(false);


 async function addToCartProduct(id) {
  let response = await addToCart(id);
  if (response?.data?.status === "success") {
    toast.success("Added to cart");
    updateItem({cartNumber});
  } else {
    toast.error("Failed");
  }
}


async function removeProduct(id) {
  let { data } = await removeFromWishlist(id);
  if (data?.status === 'success') {

    setWishProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    toast.success('Product removed from wishlist');
  } else {
    toast.error('Failed to remove product');
  }
}

  async function getWishlistProducts(){
    setIsLoading (true);
    let {data} = await getLoggedWishList();
    setWishProducts(data?.data);
    setIsLoading(false);
  }

  useEffect(()=>{
    getWishlistProducts();
  },[])







  return <>
              <Helmet>
                <title>WishList</title>
              
            </Helmet>
   {isLoading ? (
  <Loading loading background="#3B3B3B" loaderColor="#D0D0D0" />
) :<div className="w-75 bg-main-light mx-auto p-3">
    <h1 className='py-3'> My wish List</h1>
    {WishProducts?.map((product)=>(
      <div className="row my-2 border-bottom py-1 align-items-center">
        <div className="col-md-2">
          <img className='w-100'  src={product?.imageCover} alt={product?.title}/>
        </div>
        <div className="col-md-10">
          <div className='d-flex justify-content-between align-items-center'>
            <div>
            <h3 className='h6 fw-bold'>{product?.title?.split(' ').slice(0,3).join(' ')}</h3>
          <h6 className='text-main'><span className='text-black'> Price :</span> {product?.price} EGP </h6>
          <button onClick={()=>removeProduct(product?._id)} className='btn btn-outline-danger'> <i className=' font-sm fas fa-trash-can'></i> Remove</button>
            </div>
            <div>
              <button onClick={()=>addToCartProduct(product?._id)} className='btn btn-outline-success'>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>}
  </>
}
