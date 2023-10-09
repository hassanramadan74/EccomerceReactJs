import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Style from './ResetPassword.module.css';
export default function ResetPassword() {

   let navigate = useNavigate();
   
   async function handleSubmit(values){
     let response =  await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,{
      email:values.email,
      newPassword:values.password
     })
     if(response.statusText==="OK"){
    navigate('/');
  }
   }
 
 
   let formik = useFormik({
     initialValues: { email: '',
    password:''
    },
     onSubmit: handleSubmit 
   })
   
   
   return <>
   <h1 className='h3 fw-bold'>reset your account password</h1>
   <form onSubmit={formik.handleSubmit} >
  <input placeholder='Email' type="email" className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} name='email' value={formik.values.email}/>
  <input placeholder='password' type="password" className='form-control my-2' onChange={formik.handleChange} onBlur={formik.handleBlur} name='password' value={formik.values.password}/>

  <button type='submit' className='btn btn-outline-success mt-3'> reset Password</button>
  </form>
   </>
}
