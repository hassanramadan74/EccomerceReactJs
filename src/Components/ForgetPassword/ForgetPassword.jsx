import React from 'react';
import Style from './ForgetPassword.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function ForgetPassword() {
  let navigate = useNavigate();
  async function handleSubmit(values){
   let response= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
      email: values.email
    });
  if(response.data.statusMsg==='success'){
    navigate('/resetAccount')
  }
  }


  let formik = useFormik({
    initialValues: { email: '' },
    onSubmit: handleSubmit 
  })
  
  
  return <>
  <h1 className='h3 fw-bold'>please enter your verification code</h1>
  <form onSubmit={formik.handleSubmit} >
  <input placeholder='Email' type="email" className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} name='email' value={formik.values.email}/>
  <button type='submit' className='btn btn-outline-success mt-3'> verify</button>
  </form>
  </>
}
