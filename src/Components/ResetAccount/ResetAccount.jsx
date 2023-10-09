import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Style from './ResetAccount.module.css';
export default function ResetAccount() {
 
   let navigate = useNavigate();
   
  async function handleSubmit(values){
    let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{
      resetCode:values.code
    })
    if(response.data.status==='Success'){
      navigate('/resetPassword')
    }

  }


  let formik = useFormik({
    initialValues: { code: '' },
    onSubmit: handleSubmit 
  })
  
  
  return <>
  <h1 className='h3 fw-bold'>reset your account password</h1>
  <form onSubmit={formik.handleSubmit} >
  <input placeholder='Code' type="text" className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} name='code' value={formik.values.code}/>
  <button type='submit' className='btn btn-outline-success mt-3'> verify</button>
  </form>
  </>
}
