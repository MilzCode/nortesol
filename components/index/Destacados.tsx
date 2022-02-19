import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import addHttp from '../../utils/add-http';

const Destacados = ({ portadas }: any) => {
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
		autoplay: true,
		autoplaySpeed: 4000,
		nextArrow: <Arrow />,
		prevArrow: <Arrow />,
	};

	const irAlSitio = (url = '') => {
		if (url) {
			try {
				window.open(addHttp(url), '_blank');
				return;
			} catch (error) {
				return;
			}
		}
	};

	return (
		<section className="destacadosHome">
			<br />
			<div className="destacadosHome__slick">
				<Slider {...settings}>
					{portadas.map((p: any, i: any) => (
						<div key={i}>
							<div className="destacadosHome__imgContainer">
								<Image
									src={p.imagen}
									alt="..."
									height="720"
									width="1280"
									objectFit="contain"
								/>
								<div
									className={
										p.url ? 'destacadosHome__imgClickZone CURSORPOINTER' : ''
									}
									onClick={() => {
										irAlSitio(p.url);
									}}
								/>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</section>
	);
};

export default Destacados;
