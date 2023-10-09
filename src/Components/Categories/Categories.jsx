import React, { useEffect , useState} from 'react';
import Style from './Categories.module.css';
import axios from 'axios';
import { Audio } from  'react-loader-spinner';
import {Helmet} from "react-helmet";
import Loading from 'react-fullscreen-loading';

export default function Categories() {

  const [Categories, setCategory] = useState([])

  let [isLoading , setIsLoading] = useState(false);




  async function getAllBrands(){
    setIsLoading (true);
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setCategory(data.data);
    setIsLoading (false);
  }
  useEffect(()=>{
    getAllBrands();
  },[])

  return <>
              <Helmet>
                <title> Categories</title>
              
            </Helmet>
  <div className="container my-3">
    <div className="row gx-3 gy-4">
    {isLoading ? (
           <Loading loading background="#3B3B3B" loaderColor="#D0D0D0" />
          ) :
      Categories.map((category)=>(
        <div key={category._id} className="col-md-4 ">
          <div className=' product  shadow-col border'>
          <div>
            <img height={300} className='w-100' src={category.image} alt={category.name} />
          </div>
          <div className='d-flex justify-content-center align-items-center my-2'>
            <p className='text-main fw-bold '>{category.name}</p>
          </div>
        </div>
        </div>
      ))}
    </div>
  </div>

  </>
}
