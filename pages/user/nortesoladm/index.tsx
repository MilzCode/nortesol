import React from 'react';
import Link from 'next/link';
import Volver from '../../../components/general/Volver';

const nortesoladm = ({ auth, me }: any) => {
	if (!auth || !me.admin) {
		window.location.href = '/';
		return null;
	}
	return (
		<>
			<Volver />
			<br />
			<Link href="/user/nortesoladm/addproduct" passHref>
				Crear Producto
			</Link>
			<br />
			<Link href="/user/nortesoladm/addmarca" passHref>
				Crear Marcas
			</Link>
			<br />
			<Link href="/user/nortesoladm/addcategoria" passHref>
				Crear Categorias
			</Link>
			<br />
			<Link href="/user/nortesoladm/addportada" passHref>
				Crear Portada
			</Link>
			<br />
			<Link href="/user/nortesoladm/removeportada" passHref>
				Remover Portada
			</Link>
		</>
	);
};

export default nortesoladm;
