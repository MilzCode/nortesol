import React from 'react';
import ProductoHeadComprar from './recursos/ProductoHeadComprar';
import ProductoHeadImagenes from './recursos/ProductoHeadImagenes';
const ProductoHead = ({
	precio,
	imagenes,
	cantidad_disponible,
	onChangeCantidad = (c: number) => {},
	cantidad_carrito = 0,
}: any) => {
	return (
		<div className="productoHead">
			<ProductoHeadImagenes imagenes={imagenes} />
			<ProductoHeadComprar
				precio={precio}
				cantidad_disponible={cantidad_disponible}
				onChangeCantidad={onChangeCantidad}
				cantidad_carrito={cantidad_carrito}
			/>
		</div>
	);
};

export default ProductoHead;
