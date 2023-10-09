import React, { useContext } from 'react';
import Style from './ProductPayment.module.css';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';
import {Helmet} from "react-helmet";

export default function ProductPayment() {
let {cartPayment , CartId} = useContext(CartContext);



 async function handlePayment(values){
  let response = await cartPayment(values,CartId,"http://localhost:3000");
  console.log( response.data?.session?.url);
  window.location.href = response.data?.session?.url;
  }


  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    },
    onSubmit:handlePayment
  })
  return <>
            <Helmet>
                <title>Products Payment</title>
              
            </Helmet>
  <form onSubmit={formik.handleSubmit}>
    <label htmlFor="details">Details</label>
    <input className='form-control' type="text" name='details' id='details' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} />

    <label htmlFor="phone">Phone</label>
    <input className='form-control' type="tel" name='phone' id='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />

    <label htmlFor="city">City</label>
    <input className='form-control' type="text" name='city' id='city' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} />
    
    <button type='submit' className='btn bg-main mt-3 text-white'> Pay now</button>
 
  </form>

  </>
}
