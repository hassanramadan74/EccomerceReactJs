import React, { useContext ,useState,useEffect } from 'react';
import Style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { Audio } from  'react-loader-spinner';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import Loading from 'react-fullscreen-loading';

export default function Cart() {

  let {getLoggedUserCart , removeCartItem ,updateCartItem , removeAllCart , cartNumber , updateItem} = useContext(CartContext);
  const [cartProducts, setCartProducts] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  async function getCartProducts(){
    setIsLoading (true);
    let {data}=await getLoggedUserCart();
    setCartProducts(data);
    setIsLoading (false);
  }

  async function removeItem(id){
   let {data} =  await removeCartItem(id);
   setCartProducts(data);
   updateItem({cartNumber});
  }
  async function updateItemCount(id,count){
    let {data} = await updateCartItem(id , count);
    setCartProducts(data);
  }
  async function removeCart(){
    let{ data} = await removeAllCart();
    setCartProducts(data) ;
    updateItem({cartNumber});
  }
  useEffect(()=>{
    getCartProducts();
  },[])


  return <>
              <Helmet>
                <title>Cart</title>
              
            </Helmet>
            {isLoading ? (<Loading loading background="#3B3B3B" loaderColor="#D0D0D0" />) 
            :(
              
  <div className="w-75 bg-main-light mx-auto p-3">
  <div className="d-flex justify-content-between align-items-center">
    <div>
    <h3>Shopping Cart</h3>
  <h4 className='h6 text-main fw-bolder'><span className='text-black'>Cart Items :</span> {cartProducts?.numOfCartItems}</h4>
  <h4 className='text-main mb-5 h6 fw-bolder'><span className='text-black'>Total Cart Price : </span>{cartProducts?.data?.totalCartPrice} EGP</h4>
    </div>
    <div>
      <button onClick={()=>removeCart()} className='btn btn-outline-danger'> <i className="fa-solid fa-trash trash-cart"></i> Remove all</button>
    </div>
  </div>
  {cartProducts?.data?.products?.length > 0 ?(
  cartProducts?.data?.products?.map((product)=>(
  <div key={product.product.id} className='row border-bottom py-3'>
    <div className="col-md-1 ">
      <img className='w-100' src={product?.product?.imageCover} alt="any thing" />
    </div>
    <div className="col-md-11">
      <div className="d-flex justify-content-between align-items-center">
        <div>
        <h3 className='h6'>{product?.product?.title.split(' ').slice(0,3).join(' ')}</h3>
        <h6 className='text-main'><span className='text-black'>Price : </span>{product?.price} EGP </h6>
        </div>
        <div>
          <button onClick={()=>updateItemCount(product?.product?.id,product.count+1)} className='btn border-main'>+</button>
          <span className='mx-3'>{product?.count}</span>
          <button onClick={ ()=>updateItemCount(product?.product?.id,product.count-1)} className='btn border-main'>-</button>
        </div>
      </div>
      <button onClick={()=>removeItem(product?.product?.id)} className='btn p-0'><i className='text-danger font-sm fas fa-trash-can'></i> Remove</button>
    </div>
  </div>
  )

  )):
  (
    <div className="text-center mt-4">
      <p>No products in the cart.</p>
    </div>
  )
  }
  <div className='d-flex justify-content-center align-items-center my-3 '>
    <Link to={'/productPayment'} className='btn btn-outline-success '>Online payment</Link>
  </div>
</div>
 )}

  </>
}
