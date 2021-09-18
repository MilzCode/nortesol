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
    arrows: false,
  };
  return (
    <div className="productoHeadImagen">
      <Slider {...settings}>
        <div>
          <Image
            src={`/static/img/libreta.jpg`}
            alt="..."
            height="720"
            width="1280"
            objectFit="contain"
          />
        </div>
        <div>
          <Image
            src={`/static/img/lapiz.jpg`}
            alt="..."
            height="720"
            width="1280"
            objectFit="contain"
          />
        </div>
        <div>
          <Image
            src={`/static/img/tempera.jpg`}
            alt="..."
            height="720"
            width="1280"
            objectFit="contain"
          />
        </div>
        <div>
          <Image
            src="/static/img/lapices.jpg"
            alt="..."
            height="720"
            width="1280"
            objectFit="contain"
          />
        </div>
      </Slider>
    </div>
  );
};

export default ProductoHeadImagenes;
