import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EditarProd from '../../../../../../components/nortesoladm/EditarProd';
import Wredirect from '../../../../../../helpers/Wredirect';

//cantidad maxima de imagenes que se pueden subir
const EditarProductoRouteDes = ({ me }: any) => {
	const router = useRouter();
	const { id_edit_prod_des } = router.query;
	const [loadId, setLoadId] = useState(false);
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
	return (
		<>
			{loadId && (
				<EditarProd me={me} id_edit_prod={id_edit_prod_des} desabilitado />
			)}
		</>
	);
};

export default EditarProductoRouteDes;
