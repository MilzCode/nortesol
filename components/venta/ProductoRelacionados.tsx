import React from "react";
import Slider from "react-slick";
import ProductoVistaMiniatura from "./ProductoVistaMiniatura";

const ProductoRelacionados = () => {
  const Arrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} productoRelacionados__arrow`}
        style={{
          ...style,
        }}
        onClick={onClick}
      />
    );
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div className="productoRelacionados">
      <h4 className="productoRelacionados__titulo">
        Quizá te pueda interesar...
      </h4>
      <Slider {...settings}>
        <ProductoVistaMiniatura className="MAUTO" />
        <ProductoVistaMiniatura className="MAUTO" />
        <ProductoVistaMiniatura className="MAUTO" />
        <ProductoVistaMiniatura className="MAUTO" />
        <ProductoVistaMiniatura className="MAUTO" />
      </Slider>
    </div>
  );
};

export default ProductoRelacionados;
