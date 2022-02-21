import { useRouter } from 'next/router';
import Wredirect from '../../helpers/Wredirect';

const EditarProductoBTN = ({ id_edit_prod = '' }) => {
	const router = useRouter();
	return (
		<div className="editarBTN NOSELECT">
			<span
				onClick={() => {
					Wredirect('/user/nortesoladm/' + id_edit_prod);
				}}
			>
				<i className="fas fa-pencil" />
				<span>Editar</span>
			</span>
		</div>
	);
};

export default EditarProductoBTN;
