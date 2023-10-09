import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Notfound from './Components/Notfound/Notfound';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Products from './Components/Products/Products';
import ProductPayment from './Components/ProductPayment/ProductPayment';
import Brands from './Components/Brands/Brands';
import CounterContextProvider from './Context/CounterContext';
import { useContext, useEffect } from 'react';
import { UserContext } from './Context/userContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import SpecificProducts from './Components/SpecificProducts/SpecificProducts';
import CartContextProvider from './Context/CartContext';
import Orders from './Components/Orders/Orders';
import WishListCompo from './Components/WishListCompo/WishListCompo';
import WishListProvider from './Context/WishList';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetAccount from './Components/ResetAccount/ResetAccount';
import ResetPassword from './Components/ResetPassword/ResetPassword';

let routers = createHashRouter([
  { path:'/',element:<Layout/> , children:[
    {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'login' , element:<Login/>},
    {path:'register' , element:<Register/>},
    {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'forgetPassword' , element:<ForgetPassword/>},
    {path:'resetAccount' , element:<ResetAccount/>},
    {path:'resetPassword' , element:<ResetPassword/>},
    {path:'products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'wishlist' , element:<ProtectedRoute><WishListCompo/></ProtectedRoute>},
    {path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'allorders' , element:<ProtectedRoute><Orders/></ProtectedRoute>},
    {path:'productPayment' , element:<ProtectedRoute><ProductPayment/></ProtectedRoute>},
    {path:'SpecificProducts/:id' , element:<ProtectedRoute><SpecificProducts/></ProtectedRoute>},
    {path:'*' , element:<Notfound/>}
  ]}
])



function App() {
  let {setUserToken}=useContext(UserContext);

  useEffect(()=>{
    if (localStorage.getItem('userToken')!==null) {
      setUserToken(localStorage.getItem('userToken'))
    }
  },[])
  return <>
  <WishListProvider>
  <CartContextProvider>
  <CounterContextProvider>
  <RouterProvider router={routers}/>
  <Toaster></Toaster>
  </CounterContextProvider>
  </CartContextProvider>
  </WishListProvider>
  </>
}

export default App;
