import React from 'react';
import Image from 'next/image';
import Capitalize from '../../utils/capitalize';
import formatNumberToprice from '../../utils/formatoPrecio';
import Link from 'next/link';
import { paths } from '../../utils/constantes';
import CalcularPorcentajeDescuento from '../../utils/calcular-descuento';

const ProductoVistaMiniatura = ({
	className,
	nombre,
	precio,
	imagen,
	nombre_url,
	desabilitado = false,
	descuento = 0,
}: any) => {
	const porcentajeDescuento = CalcularPorcentajeDescuento(precio, descuento);
	return (
		<div className={className}>
			<Link
				passHref
				href={
					nombre_url
						? (!desabilitado ? paths.producto : paths.productoDes) +
						  '/' +
						  nombre_url
						: '#'
				}
			>
				<a>
					<div className={`productoVistaMiniatura NOSELECT`} draggable={false}>
						<div className="productoVistaMiniatura__imagen NOSELECT">
							<Image
								draggable={false}
								src={imagen ?? '/static/img/noimage.jpg'}
								alt="..."
								height="720"
								width="1280"
								objectFit="contain"
							/>
						</div>
						<div className="productoVistaMiniatura__nombre">
							{nombre ? Capitalize(nombre) : 'Sin Titulo'}
						</div>
						<div
							className={`productoVistaMiniatura__precio${
								descuento ? '--descuento' : ''
							} NOSELECT`}
						>
							{precio
								? formatNumberToprice(precio - descuento)
								: '$999.999.999'}
							<span
								className={`productoHeadComprar__porcentaje${
									descuento ? '' : '--no'
								}`}
							>
								&nbsp;{-porcentajeDescuento}%
							</span>
						</div>
						<div className="productoVistaMiniatura__mostrar">
							<i className="fas fa-eye" />
							<span className="NOSELECT">Ver</span>
						</div>
					</div>
				</a>
			</Link>
		</div>
	);
};

export default ProductoVistaMiniatura;
