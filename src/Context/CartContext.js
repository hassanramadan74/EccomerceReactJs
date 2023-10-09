import axios from 'axios';
import React, { createContext  , useEffect, useState} from 'react'

export let CartContext = createContext();
let userToken = localStorage.getItem('userToken');
let headers = {
    token : userToken
}
let BaseUrl = "https://ecommerce.routemisr.com";
function addToCart(id){
   return axios.post(`${BaseUrl}/api/v1/cart`,
    {
        productId: id
    },
    {
        headers
    }
    ).then((response)=>response)
    .catch((error)=>error)
}

function getLoggedUserCart(){
    return  axios.get(`${BaseUrl}/api/v1/cart`,{headers})
    .then((response)=>response)
    .catch((err)=>err)
}

function removeCartItem(productId){
return axios.delete(`${BaseUrl}/api/v1/cart/${productId}`,{headers})
.then((response)=>response)
.catch((error)=>error)

}

function updateCartItem(productId,count){
    return axios.put(`${BaseUrl}/api/v1/cart/${productId}`,{count},{headers})
    .then((response)=>response)
    .catch((error)=>error)
}
function cartPayment(values,cartId,url){
    return axios.post(`${BaseUrl}/api/v1/orders/checkout-session/${cartId}?url=${url}`,{shippingAddress:values},{headers})
    .then((response)=>response)
    .catch((error)=>error)
}


function removeAllCart(){
    return  axios.delete(`${BaseUrl}/api/v1/cart`,{headers})
    .then((response)=>response)
    .catch((err)=>err)
}




export default function CartContextProvider(props) {
    const [CartId, setCartId] = useState(null);
    const [CartNumber, setCartNumber] = useState(null)
    async function getCardId(){
        let {data} = await getLoggedUserCart();
        setCartNumber(data?.numOfCartItems);
        setCartId(data?.data?._id);
    }
    async function updateItem(){
        let {data} = await getLoggedUserCart();
        setCartNumber(data?.numOfCartItems);
    }
    useEffect(()=>{
        getCardId();
    },[])




    return <CartContext.Provider value={{addToCart , getLoggedUserCart , removeCartItem ,updateCartItem ,removeAllCart ,cartPayment , CartId , CartNumber , setCartNumber , updateItem}}>
        {props.children}
    </CartContext.Provider>

}
