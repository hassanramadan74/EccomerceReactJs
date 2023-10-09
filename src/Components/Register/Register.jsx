import React, { useState } from 'react';
import Style from './Register.module.css';
import {  useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from  'react-loader-spinner';
import {Helmet} from "react-helmet";

export default function Register() {

  let navigate = useNavigate();
  const [error , seterror]=useState(null);

  const [isLoading , setIsLoading]=useState(false);

  async function registerForm(values) {
    setIsLoading(true);
      const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
      .catch( 
        (err)=> {
          setIsLoading(false);
          seterror(err.response.data.message);
        }
        )
      if (data.message === 'success') {
        setIsLoading(false);
        navigate('/login');
      }

    }



  let validationSchema = Yup.object({
    name : Yup.string().min(3,'more than three character').max(10,'less than 10 character').required('name is required'),
    email: Yup.string().email('email is invalid').required('email is required'),
    phone: Yup.string().required('phone is required'),
    password: Yup.string().required('password is required'),
    rePassword: Yup.string().oneOf([Yup.ref("password")],'password is not match').required('rePassword is required')
  })



  // function validate(values){
  //   let phoneValidate = /^(?:\(\d{3}\)|\d{3}[-\s]?)\d{3}[-\s]?\d{4}$/;
  //   let emailValidate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  //   let errors = {};
  //   if(!values.name){
  //     errors.name="Name is required";
  //   }
  //   else if(values.name.length<3){
  //     errors.name="Name must be at least 2 characters";
  //   }
  //   else if(values.name.length>10){
  //     errors.name="Name must be less than 10 characters";
  //   }
  //   if(!values.phone){
  //     errors.phone="phone is required";
  //   }
  //   else if(!phoneValidate.test(values.phone)){
  //     errors.phone= "Invalid Phone Number";
  //   }
  //   if(!values.email){
  //     errors.email="email is required";
  //   }
  //   else if(!emailValidate.test(values.email)){
  //     errors.email= "Invalid email ";
  //   }

  //   return errors;
  // }



  let formik = useFormik({

    initialValues: {
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:''
    }
    ,
    validationSchema
    ,
    onSubmit:registerForm
  })
  
  return <>
              <Helmet>
                <title>Register</title>
              
            </Helmet>
  <div className="w-75 mx-auto py-5">
    {error == null ?'':<div className="alert alert-danger">{error}</div>}
    

    <h2>Register Now </h2>
    <form onSubmit={formik.handleSubmit}>

    <label htmlFor="name">name : </label>
    <input type="text" id='name' value={formik.values.name} name='name' onChange={formik.handleChange} onBlur={formik.handleBlur}  className=' form-control'/>
    {formik.errors.name && formik.touched.name?<div className="alert p-2 mt-2 alert-danger">{formik.errors.name}</div>:<span></span>}
    

    <label htmlFor="email">email : </label>
    <input type="email" id='email' value={formik.values.email} name='email' onChange={formik.handleChange} onBlur={formik.handleBlur}  className=' form-control'/>
    {formik.errors.email && formik.touched.email?<div className="alert p-2 mt-2 alert-danger">{formik.errors.email}</div>:<span></span>}


    <label htmlFor="phone">phone : </label>
    <input type="tel" id='phone' value={formik.values.phone} name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur}  className=' form-control'/>
    {formik.errors.phone && formik.touched.phone?<div className="alert p-2 mt-2 alert-danger">{formik.errors.phone}</div>:<span></span>}
    
    
    <label htmlFor="password">password : </label>
    <input type="password" id='password' value={formik.values.password} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur}  className=' form-control'/>
    {formik.errors.password && formik.touched.password?<div className="alert p-2 mt-2 alert-danger">{formik.errors.password}</div>:<span></span>}


    <label htmlFor="rePassword">rePassword : </label>
    <input type="password" id='rePassword' value={formik.values.rePassword} name='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur}  className=' form-control'/>
    {formik.errors.rePassword && formik.touched.rePassword?<div className="alert p-2 mt-2 alert-danger">{formik.errors.rePassword}</div>:<span></span>}
    
    
    {isLoading?<Audio
    height = "80"
    width = "80"
    radius = "9"
    color = 'green'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
    wrapperClass
  />:    <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Register</button>}


    </form>
  </div>


  </>
}
