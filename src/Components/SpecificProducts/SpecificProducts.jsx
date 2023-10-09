import React, { useContext, useEffect , useState } from 'react';
import Style from './SpecificProducts.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { toast } from 'react-hot-toast';
import {Helmet} from "react-helmet";

import { CartContext } from '../../Context/CartContext';
export default function SpecificProducts() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const [Product, setProduct] = useState(null);
let {addToCart , cartNumber , updateItem}= useContext(CartContext);
  let params = useParams();
  

  async function addToCartProduct(id){
    let response = await addToCart(id);
    if(response.data?.status==='success'){  
      toast.success('Added to cart');
      updateItem({cartNumber});

    }
    else{
      toast.error("Failed");
    }
  }

  async function getSpecificProduct(id){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    setProduct(data.data);
  }


  useEffect(()=>{
    getSpecificProduct(params.id);
  },[])


  return <>
              <Helmet>
                <title>{Product?.title.split(' ').slice(0,2).join(' ')}</title>
            </Helmet>
  {Product?  <div className="row py-2 align-items-center">
  <div className="col-md-4">
  <Slider {...settings}>
    {Product.images.map((imgSrc)=>(
      <img src={imgSrc} alt={Product.title}/>
    ))}
    </Slider>

  </div>
  <div className="col-md-8 ">
    <h2 className='h5'>{Product.title}</h2>
    <p>{Product.description}</p>
    <h6 className='fw-bolder'>{Product.category.name}</h6>
    <div className='d-flex justify-content-between'>
    <h6>Price : {Product.price} EGP</h6>
    <span><i className='fas fa-star rating-color'></i> {Product.ratingsAverage}</span>
    </div>
    <button onClick={()=>addToCartProduct(Product.id)} className='btn w-100 bg-main text-white mt-2  '>Add to Cart</button>
  </div>
</div> :''}

  </>
}
