import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const ProductoVistaMiniatura = ({
	className,
	nombre,
	precio,
	imagen,
	nombre_url,
}: any) => {
	const router = useRouter();

	return (
		<div
			className={`productoVistaMiniatura ${className}`}
			onClick={() => {
				nombre_url ? router.push('/producto/' + nombre_url) : null;
			}}
		>
			<div className="productoVistaMiniatura__imagen NOSELECT">
				<Image
					src={imagen ?? '/static/img/noimage.jpg'}
					alt="..."
					height="720"
					width="1280"
					objectFit="contain"
				/>
			</div>
			<div className="productoVistaMiniatura__nombre">
				{nombre ?? 'Sin Titulo'}
			</div>
			<div className="productoVistaMiniatura__precio NOSELECT">
				{precio ?? '$999.999.999'}
			</div>
			<div className="productoVistaMiniatura__mostrar">
				<i className="fas fa-eye" />
				<span className="NOSELECT">Ver</span>
			</div>
		</div>
	);
};

export default ProductoVistaMiniatura;
