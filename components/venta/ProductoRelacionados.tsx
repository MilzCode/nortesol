import React from 'react';
import Slider from 'react-slick';
import ProductoVistaMiniatura from './ProductoVistaMiniatura';

const ProductoRelacionados = ({ productosRel }: any) => {
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
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		nextArrow: <Arrow />,
		prevArrow: <Arrow />,
	};
	return (
		<>
			{productosRel.length > 0 && (
				<>
					<hr />

					<div className="productoRelacionados">
						<h4 className="productoRelacionados__titulo">
							Quizá te pueda interesar...
						</h4>
						<Slider {...settings}>
							{productosRel.map((p: any, i: any) => (
								<ProductoVistaMiniatura
									nombre={p.nombre}
									precio={p.precio}
									nombre_url={p.nombre_url}
									imagen={p.imagen}
									key={i}
								/>
							))}
						</Slider>
					</div>
				</>
			)}
		</>
	);
};

export default ProductoRelacionados;
