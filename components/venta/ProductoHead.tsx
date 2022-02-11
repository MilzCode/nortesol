import React from 'react';
import ProductoHeadComprar from './recursos/ProductoHeadComprar';
import ProductoHeadImagenes from './recursos/ProductoHeadImagenes';
const ProductoHead = ({ precio, cantidadLlevada, imagenes }: any) => {
	return (
		<div className="productoHead">
			<ProductoHeadImagenes imagenes={imagenes} />
			<ProductoHeadComprar precio={precio} cantidadLlevada={cantidadLlevada} />
		</div>
	);
};

export default ProductoHead;
