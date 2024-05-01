"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import DayCard from "../DayCard";

interface CarouselProps {
  days: string[];
  values: { endTime: string; startTime: string }[];
  periodicity: number;
  data: any;
}

const Carrousel = ({ days, values, periodicity, data }: CarouselProps) => {
  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function generarFechasDisponibles() {
    const fechasDisponibles = [];
    const hoy = new Date(); // Obtenemos la fecha actual
    for (let i = 0; i < 7; i++) {
      const fecha = new Date(hoy.getTime() + i * 24 * 60 * 60 * 1000); // Añadimos i días a la fecha actual
      fechasDisponibles.push(fecha); // Agregamos la fecha al array
    }
    return fechasDisponibles;
  }

  const daysWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const fechas = generarFechasDisponibles();
  const fechasFormateadas = fechas.map((fecha) => {
    const dayIndex = fecha.getDay();
    const day = fecha.getDate().toString().padStart(2, "0");
    const month = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const year = fecha.getFullYear();

    const dayName = daysWeek[dayIndex];
    return {
      date: `${day}/${month}/${year}`,
      day: dayName,
      range: dayName? data[daysWeek[dayIndex]] : null,
    };
  });

  return (
    <Slider {...settings}>
      {fechasFormateadas.map((dayData, index) => (
        <DayCard
          key={index}
          dayData={dayData}
          periodicity={periodicity}
        />
      ))}
    </Slider>
  );
};

export default Carrousel;
