import React from "react";
import Image from "next/image";
import Slider from "react-slick";

const ProductoHeadImagenes = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return (
    <div className="productoHead__img">
      <img src="/static/img/lapices.jpg" alt="producto1" />
    </div>
  );
};

export default ProductoHeadImagenes;
