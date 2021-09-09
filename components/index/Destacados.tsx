import React from "react";
import Slider from "react-slick";
import Image from "next/image";

const Destacados = () => {
  const Arrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} destacadosHome__arrow`}
        style={{
          ...style,
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };

  return (
    <section className="destacadosHome">
      <div className="destacadosHome__slick">
        <Slider {...settings}>
          <Image
            src={`/static/img/libreta.jpg`}
            alt="..."
            height="720"
            width="1280"
            objectFit="contain"
          />
          <Image
            src={`/static/img/lapiz.jpg`}
            alt="..."
            height="720"
            width="1280"
            objectFit="contain"
          />
          <Image
            src={`/static/img/tempera.jpg`}
            alt="..."
            height="720"
            width="1280"
            objectFit="contain"
          />
          <Image
            src={`/static/img/lapices.jpg`}
            alt="..."
            height="720"
            width="1280"
            objectFit="contain"
          />
        </Slider>
      </div>
    </section>
  );
};

export default Destacados;
