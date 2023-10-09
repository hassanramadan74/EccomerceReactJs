import React from 'react';
import Style from './MainSlider.module.css';
import Slider from "react-slick";

import slideOne from '../../Assets/images/slider-image-1.jpeg';
import slideTwo from '../../Assets/images/slider-image-2.jpeg';
import slideThree from '../../Assets/images/slider-image-3.jpeg';

import blogOne from '../../Assets/images/grocery-banner.png';
import blogTwo from '../../Assets/images/grocery-banner-2.jpeg';

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };
  return <>



  <div className="row gx-0 py-4">


    <div className="col-md-9">
    <Slider {...settings}>
    <img height={500} className='w-100' src={slideOne} alt="" />
    <img height={500} className='w-100' src={slideTwo} alt="" />
    <img height={500} className='w-100' src={slideThree} alt="" />

    </Slider>

    </div>

    <div className="col-md-3">
      <img height={250} className='w-100' src={blogOne} alt='ayhaga'/>
      <img height={250} className='w-100' src={blogTwo} alt='ayhaga' />
    </div>


  </div>


  </>
}
