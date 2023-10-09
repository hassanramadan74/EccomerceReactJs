import React, { useEffect , useState} from 'react';
import Style from './Brands.module.css';
import axios from 'axios';
import Loading from 'react-fullscreen-loading';
import { Audio } from  'react-loader-spinner';
import {Helmet} from "react-helmet";
export default function Brands() {

  const [Brands, setBrands] = useState([])

  let [isLoading , setIsLoading] = useState(false);




  async function getAllBrands(){
    setIsLoading (true);
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    setBrands(data.data);
    setIsLoading (false);
  }
  useEffect(()=>{
    getAllBrands();
  },[])

  return <>
              <Helmet>
                <title> Brands</title>
              
            </Helmet>
  <div className="container py-2">
    <div className=' d-flex justify-content-center align-items-center my-4'>
    <h2 className='text-main fw-bold'>All Brands</h2>
    </div>
    <div className="row gx-2 gy-2">
    {isLoading?  <Loading loading background="#3B3B3B" loaderColor="#D0D0D0" />
:
    <>{Brands.map((brand)=>
        <div  key={brand._id} className="col-md-2 cursor-pointer border mx-5 my-4 shadow-col rounded-1">
          <div>
          <img className='w-100' src={brand.image} alt={brand.name}/>
          </div>
          <div className='d-flex justify-content-center align-items-center'>
          <p>{brand.name}</p>
          </div>
        
          </div>
       
      )}</>}
      
    </div>
  </div>
  </>


}
