import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';

const ProductoHeadImagenes = ({ imagenes = [] }: any) => {
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
	console.log(imagenes);
	return (
		<div className="productoHeadImagen">
			<Slider {...settings}>
				{imagenes.length > 0 ? (
					imagenes.map((imagen: any, i: any) => {
						<div>
							<Image
								src={imagen ?? '/static/img/libreta.jpg'}
								alt="..."
								height="720"
								width="1280"
								objectFit="contain"
							/>
						</div>;
					})
				) : (
					<div>
						<Image
							src={`/static/img/libreta.jpg`}
							alt="..."
							height="720"
							width="1280"
							objectFit="contain"
						/>
					</div>
				)}
			</Slider>
		</div>
	);
};

export default ProductoHeadImagenes;
