import axios from "axios";
import { createContext, useState } from "react";

export let WishList = createContext();

export default function WishListProvider(props){

    let userToken = localStorage.getItem('userToken');
let headers = {
    token : userToken
}
    function addToWishlist(id){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
            productId:id
        },
        {
            headers
        }
        ).then((response)=>response)
        .catch((err)=>err)
    }

    function getLoggedWishList(){
        return 	axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{headers})
        .then((response)=>response)
        .catch((error)=>error)
    }
    function removeFromWishlist (id){
        return   axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
        .then((response)=>response)
        .catch((error)=>error)
    }







  return<WishList.Provider value={{addToWishlist , getLoggedWishList , removeFromWishlist}}>
        {props.children}
    </WishList.Provider>
}