import { useRouter } from 'next/router';
import wredirect from '../../helpers/wredirect';

const EditarProductoBTN = ({ id_edit_prod = '' }) => {
	const router = useRouter();
	return (
		<div className="editarBTN NOSELECT">
			<span
				onClick={() => {
					wredirect('/user/nortesoladm/' + id_edit_prod);
				}}
			>
				<i className="fas fa-pencil" />
				<span>Editar</span>
			</span>
		</div>
	);
};

export default EditarProductoBTN;
