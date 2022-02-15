import { useRouter } from 'next/router';

const EditarProducto = () => {
	const router = useRouter();
	return (
		<div className="editarBTN NOSELECT">
			<span onClick={() => router.back()}>
				<i className="fas fa-pencil" />
				<span>Editar</span>
			</span>
		</div>
	);
};

export default EditarProducto;
