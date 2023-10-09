import React, { useContext } from 'react';
import Style from './Home.module.css';
import { CounterContext } from '../../Context/CounterContext';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import {Helmet} from "react-helmet";

export default function Home() {



  return <>


            <Helmet>
                <title>FreshCart HomePage</title>
              
            </Helmet>
  <MainSlider/>
  <CategorySlider/>
  <FeaturedProducts/>

  </>
}
