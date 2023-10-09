import React, { useContext, useState } from 'react';
import Style from './Login.module.css';
import {  useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Audio } from  'react-loader-spinner';
import { UserContext } from '../../Context/userContext';
import {Helmet} from "react-helmet";

export default function Login() {
  let {setUserToken}= useContext(UserContext);
  let navigate = useNavigate();
  const [error , seterror]=useState(null);
  const [isLoading , setIsLoading]=useState(false);




  async function loginSubmit(values) {
    setIsLoading(true);
      const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
      .catch(
        (err)=> {
          setIsLoading(false);
          seterror(err.response.data.message);
        }
        )
      if (data.message === 'success') {
        setIsLoading(false);
        localStorage.setItem("userToken",data.token);
        setUserToken(data.token);
        navigate('/');
      }
    }





  let validationSchema = Yup.object({
    email: Yup.string().email('email is invalid').required('email is required'),
    password: Yup.string().required('password is required'),
  })




  let formik = useFormik({
    initialValues: {
      email:'',
      password:'',
    }
    ,
    validationSchema
    ,
    onSubmit:loginSubmit
  })




  return <>
            <Helmet>
                <title>Login</title>
              
            </Helmet>
  <div className="w-75 mx-auto py-5">
    {error == null ?'':<div className="alert alert-danger">{error}</div>}
    <h2>Login </h2>
    <form onSubmit={formik.handleSubmit}>


    <label htmlFor="email">email : </label>
    <input type="email" id='email' value={formik.values.email} name='email' onChange={formik.handleChange} onBlur={formik.handleBlur}  className=' form-control'/>
    {formik.errors.email && formik.touched.email?<div className="alert p-2 mt-2 alert-danger">{formik.errors.email}</div>:<span></span>}


    <label htmlFor="password">password : </label>
    <input type="password" id='password' value={formik.values.password} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur}  className=' form-control'/>
    {formik.errors.password && formik.touched.password?<div className="alert p-2 mt-2 alert-danger">{formik.errors.password}</div>:<span></span>}


    {isLoading?<Audio
    height = "80"
    width = "80"
    radius = "9"
    color = 'green'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
    wrapperClass
    />:  <div className="d-flex align-items-center justify-content-between">
      <div>
      <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Login</button>
      <Link to={'/forgetPassword'} className='btn frog-text mt-2'>forget your password ?</Link>
      </div>
      <div>
      <Link className='btn' to={'/register'}>Register Now</Link>
      </div>
        
  </div>
}

    </form>
  </div>

  </>
}
