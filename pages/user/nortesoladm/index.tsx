import React from 'react';
import Link from 'next/link';
import Volver from '../../../components/general/Volver';
import { paths } from '../../../utils/constantes';
import wredirect from '../../../helpers/wredirect';

const nortesoladm = ({ auth, me }: any) => {
	if (!auth || !me.admin) {
		wredirect();
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
			<br />
			<Link href="/user/nortesoladm/addanuncio" passHref>
				Anuncio
			</Link>
			<br />
			<Link href={paths.searchDesabilitados} passHref>
				Ver Productos desabilitados
			</Link>
		</>
	);
};

export default nortesoladm;
