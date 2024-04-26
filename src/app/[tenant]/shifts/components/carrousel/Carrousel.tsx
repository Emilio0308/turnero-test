"use client"
import React, { useState } from 'react';
import DayCard from '../DayCard';
import styles from './carrousel.module.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

interface CarouselProps {
  data: string[]; // Cambia el tipo según la estructura de tus datos
}



const Carrousel = ({ data }: CarouselProps) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Slider {...settings}>
      {data.map((day, index) => (
          <DayCard key={index} day={day} />
        ))}
    </Slider>
  );
}

export default Carrousel;
