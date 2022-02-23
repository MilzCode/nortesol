import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EditarProd from '../../../../../../components/nortesoladm/EditarProd';
import Wredirect from '../../../../../../helpers/Wredirect';
import BotonFAColores1 from '../../../../../../components/general/BotonFAColores1';
import VentanaModal from '../../../../../../components/general/VentanaModal';
import Volver from '../../../../../../components/general/Volver';

//cantidad maxima de imagenes que se pueden subir
const EditarProductoRouteDes = ({ me }: any) => {
	const router = useRouter();
	const { id_edit_prod_des } = router.query;
	const [loadId, setLoadId] = useState(false);
	const [
		confirmarBorrarDefinitivamente,
		setConfirmarBorrarDefinitivamente,
	] = useState(false);
	useEffect(() => {
		if (!me.admin) return;
		if (id_edit_prod_des) {
			setLoadId(true);
		}
	}, [id_edit_prod_des]);

	if (!me.admin) {
		Wredirect();
		return null;
	}
	const handdleBorrarDefinitivamente = () => {
		if (!id_edit_prod_des) return;
		console.log('borrado');
		setConfirmarBorrarDefinitivamente(false);
	};
	return (
		<>
			<Volver cantPagesBack={3} />
			<h1 className="producto__titulo">Editar Producto</h1>
			<br />
			<br />
			{loadId && (
				<>
					<BotonFAColores1
						backgroundColor="red"
						onCLick={() => {
							setConfirmarBorrarDefinitivamente(true);
						}}
					>
						Borrar Producto Definitivamente
					</BotonFAColores1>
					{confirmarBorrarDefinitivamente && (
						<VentanaModal titulo="Esto no se podra deshacer ¿Segur@?">
							<BotonFAColores1
								backgroundColor="red"
								onClick={handdleBorrarDefinitivamente}
							>
								Si
							</BotonFAColores1>
						</VentanaModal>
					)}
					<EditarProd me={me} id_edit_prod={id_edit_prod_des} desabilitado />
				</>
			)}
		</>
	);
};

export default EditarProductoRouteDes;
