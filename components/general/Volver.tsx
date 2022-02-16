import React from 'react';
import { useRouter } from 'next/router';

const Volver = ({ mode1 = false }) => {
	const router = useRouter();
	const path = router.asPath.split('?')[0];
	const handdleVolver = () => {
		if (!mode1) {
			const pathAnterior = path.split('/').slice(0, -1).join('/');
			router.push(pathAnterior ? pathAnterior : '/');
			return;
		}
		router.back();
	};
	return (
		<div className="volverBoton NOSELECT">
			<span onClick={handdleVolver}>
				<i className="fas fa-level-up-alt" />
				<span>Volver</span>
			</span>
		</div>
	);
};

export default Volver;
