import React, { useEffect } from 'react';
import Style from './CategorySlider.module.css';
import { useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";

export default function CategorySlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2
  };

  const [Categories, setCategories] = useState([])
  async function getAllCategories(){
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    console.log(data.data)
    setCategories(data.data)
  }


  useEffect(()=>{
    getAllCategories()
  },[])





  return <>

  {Categories?<div className='py-5'><div>
    <Slider {...settings}>
    {Categories.map((category)=>(
      <img height={200} key={category._id} src={category.image} alt={category.name} />
    )
    )}
  </Slider></div>
  <div>
  <Slider {...settings}>
  {Categories.map((category)=>(
    <img height={200} key={category._id} src={category.image} alt={category.name} />
  )
  )}
</Slider></div>
  </div>:''}
  </>
}
