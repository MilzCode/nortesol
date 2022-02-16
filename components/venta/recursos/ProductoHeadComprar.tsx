import React, { useState } from 'react';
import BotonFA from '../../general/BotonFAColores1';
import formatoPrecio from '../../../utils/formatoPrecio';

const ProductoHeadComprar = ({
	precio,
	cantidad_disponible = 0,
	onChangeCantidad,
	cantidad_carrito,
}: any) => {
	const [cantidadComprar, setCantidadComprar] = useState(0);
	const handdleCantidadComprar = (cant = 0) => {
		if (cant >= 0) {
			if (cant >= cantidad_disponible) {
				setCantidadComprar(cantidad_disponible);
				onChangeCantidad(cantidad_disponible);
				return;
			}
			setCantidadComprar(cant);
			onChangeCantidad(cant);
			return;
		}
	};
	return (
		<div className="productoHeadComprar NOSELECT">
			<p className="productoHeadComprar__titulo1">Precio Unitario</p>
			<p className="productoHeadComprar__precio">
				{formatoPrecio(precio ? precio : 999999)}
			</p>
			<p className="productoHeadComprar__titulo2">Cantidad</p>
			<div className="productoHeadComprar__cantidad">
				<i
					className="far fa-minus-square"
					onClick={() => {
						handdleCantidadComprar(cantidadComprar - 1);
					}}
				>
					<div />
				</i>
				<input
					type="tel"
					value={cantidadComprar}
					max={99}
					maxLength={2}
					onChange={(e) => {
						handdleCantidadComprar(Number(e.target.value));
					}}
				/>
				<i
					className="fas fa-plus-square"
					onClick={() => {
						handdleCantidadComprar(cantidadComprar + 1);
					}}
				>
					<div />
				</i>
			</div>
			<br />
			<BotonFA className="productoHeadComprar__boton" backgroundColor="#ff6a39">
				<i className="fas fa-cart-arrow-down"></i>
				Agregar al carrito
			</BotonFA>
			<BotonFA className="productoHeadComprar__boton" backgroundColor="#f9423a">
				<i className="fas fa-shopping-cart"></i>
				Ir al carrito
			</BotonFA>

			<small className="carrito__totalMensajeFinal">
				Quedan {cantidad_disponible} unidades de este articulo.
				<br />
				Llevas {cantidad_carrito} en el carrito.
			</small>
		</div>
	);
};

export default ProductoHeadComprar;
