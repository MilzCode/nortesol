import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useProducto from '../../../hooks/useProducto';
import Volver from '../../../components/general/Volver';
import BotonFAColores1 from '../../../components/general/BotonFAColores1';
import VentanaModal from '../../../components/general/VentanaModal';
import EditorTexto from '../../../components/nortesoladm/EditorTexto';
import useMarcas from '../../../hooks/useMarcas';
import useCategorias from '../../../hooks/useCategorias';
import Select from 'react-select';
import Capitalize from '../../../utils/capitalize';
import useEditarProducto from '../../../hooks/useEditarProducto';
import ProductoHead from '../../../components/venta/ProductoHead';
import ProductoBody from '../../../components/venta/ProductoBody';
import ProductoRelacionados from '../../../components/venta/ProductoRelacionados';

const EditarProducto = ({ auth, me }: any) => {
	if (!auth || !me.admin) {
		window.location.href = '/';
		return null;
	}
	//cantidad maxima de imagenes que se pueden subir
	const maxImg = 2;
	const router = useRouter();
	const [producto, setProducto] = useState({
		nombre: '',
		precio: 9999999,
		categorias: [],
		marca: '',
		cantidad: 0,
		descripcion: '',
		imagenes: [],
		load: false,
		idProd: '',
	});
	const [confirmarBorrar, setConfirmarBorrar] = useState(false);
	const [preview, setPreview] = useState(false);
	const [siguiente, setSiguiente] = useState(false);
	const [categoriasOpt, setCategoriasOpt] = useState<any>([]);
	const [marcasOpt, setMarcaOpt] = useState([]);
	const [imagenes, setImagenes] = useState<any>([]);
	const [imagenesPreview, setImagenesPreview] = useState<any>([]);
	const { id_edit_prod } = router.query;
	//upload
	const [subido, setSubido] = useState(false);
	const [subir, setSubir] = useState(false);
	const [subidoMsg, setSubidoMsg] = useState('Producto subido con exito');
	const [errSubir, setErrSubir] = useState(false);
	const [errSubirMSG, setErrSubirMSG] = useState('');

	useEffect(() => {
		id_edit_prod &&
			//@ts-ignore
			useProducto(id_edit_prod)
				.then((res: { ok: false; producto: null }) => {
					if (!res.ok) {
						router.push('/');
						return;
					}
					//@ts-ignore
					let { nombre, precio, categorias, marca, id } = res.producto;
					if (categorias) {
						categorias = categorias.map((categoria: any) => {
							return {
								value: categoria.nombre,
								label: Capitalize(categoria.nombre),
							};
						});
					}
					if (marca) {
						marca = { value: marca.nombre, label: Capitalize(marca.nombre) };
					}
					//@ts-ignore
					const {
						descripcion,
						imagenes,
						cantidad,
						_id,
						//@ts-ignore
					} = res.producto.detalle_producto;
					setImagenesPreview(imagenes);
					setProducto({
						nombre,
						precio,
						categorias,
						marca,
						cantidad,
						descripcion,
						imagenes,
						load: true,
						idProd: id,
					});
				})
				.catch(() => {
					window.location.href = '/';
				});
	}, [id_edit_prod]);

	useEffect(() => {
		useCategorias().then((c) => setCategoriasOpt(c));
		useMarcas().then((m) => setMarcaOpt(m));
	}, []);

	const handdleGuardarLocalmente = () => {};
	const handdleBorrarContenido = () => {};
	const handdleSiguiente = () => {
		handdleGuardarLocalmente();
		setSiguiente(true);
	};
	const handdleAnterior = () => {
		handdleGuardarLocalmente();
		setSiguiente(false);
	};
	const handdlePreview = () => {
		!preview && handdleGuardarLocalmente();
		setPreview(!preview);
	};
	const handdleProducto = (...prop: any) => {
		const data = { ...producto, ...prop };
		setProducto(data);
	};

	const handdleCategorias = (categorias: any) => {
		const data = { ...producto, categorias };
		setProducto(data);
	};
	const handdleMarca = (marca: any) => {
		const data = { ...producto, marca };
		setProducto(data);
	};

	const handdleImagenes = (e: any) => {
		if (e.target.files.length > maxImg) {
			alert(`Solo se pueden subir ${maxImg} imagenes `);
			return;
		}
		let dataUrls = [];
		for (let i = 0; i < e.target.files.length; i++) {
			dataUrls.push(URL.createObjectURL(e.target.files[i] as any));
		}
		setImagenes(e.target.files);
		console.log(dataUrls);
		setImagenesPreview(dataUrls);
	};

	const puedeSubir =
		producto.nombre &&
		//@ts-ignore
		producto.categorias.length > 0 &&
		producto.marca &&
		producto.cantidad &&
		producto.precio &&
		//@ts-ignore
		producto.imagenes.length > 0;

	const actualizarProducto = async () => {
		setSubir(true);
		const data = {
			descripcion: producto.descripcion,
			nombre: producto.nombre,
			precio: producto.precio,
			categorias: producto.categorias.map((c: any) => c.value),
			cantidad: producto.cantidad,
			imagenes,
			//@ts-ignore
			marca: marca.value,
			idProd: producto.idProd,
		};

		const res = await useEditarProducto(data);

		if (!res.ok) {
			setSubir(false);
			setErrSubir(true);
			setErrSubirMSG(res.msg);
			return;
		}
		if (res.type === 'noimage') {
			setSubidoMsg('Producto Subido, pero no se pudo subir las imagenes');
		}

		setSubir(false);
		setSubido(true);
	};

	return (
		<>
			{producto && (
				<>
					<Volver />
					<hr />
					<div className="BOTONES">
						{!preview && (
							<>
								<BotonFAColores1
									onClick={() => {
										setConfirmarBorrar(true);
									}}
									backgroundColor="#f9423a"
								>
									Borrar
								</BotonFAColores1>
								{confirmarBorrar && (
									<VentanaModal
										titulo="¿Quieres borrar todo?"
										onClose={() => {
											setConfirmarBorrar(false);
										}}
									>
										<BotonFAColores1
											backgroundColor="#f9423a"
											onClick={handdleBorrarContenido}
										>
											Si
										</BotonFAColores1>
									</VentanaModal>
								)}
								<BotonFAColores1 onClick={handdleGuardarLocalmente}>
									Guardar
								</BotonFAColores1>

								{siguiente && (
									<BotonFAColores1
										backgroundColor="#ff6a39"
										onClick={handdleAnterior}
									>
										<i className="fas fa-arrow-left"></i>
										&nbsp;Anterior
									</BotonFAColores1>
								)}

								{!siguiente && (
									<BotonFAColores1
										backgroundColor="#00a5df"
										onClick={handdleSiguiente}
									>
										Siguiente&nbsp;
										<i className="fas fa-arrow-right"></i>
									</BotonFAColores1>
								)}
							</>
						)}
						<BotonFAColores1 backgroundColor="#69b3e7" onClick={handdlePreview}>
							{!preview && <i className="fas fa-eye"></i>}
							{preview && <i className="fas fa-eye-slash"></i>}
						</BotonFAColores1>
					</div>
					<br />
					{!siguiente && !preview && (
						<>
							<h1 className="TITULOSFORM">Editor de descripción</h1>
							<hr />
							<EditorTexto
								setStateContenido={(descripcion: any) =>
									handdleProducto({ descripcion })
								}
								dataInicial={producto.descripcion}
							/>
						</>
					)}
					{siguiente && !preview && (
						<>
							<h1 className="TITULOSFORM">Datos del producto</h1>
							<hr />
							<div className="LABELINPUT">
								<label>Nombre</label>
								<input
									type="text"
									value={producto.nombre}
									onChange={(nombre) => {
										handdleProducto({ nombre: nombre.target.value });
									}}
								/>
							</div>
							<div className="LABELINPUT">
								<label>Precio</label>
								<input
									type="number"
									value={producto.precio}
									onChange={(precio) => {
										handdleProducto({ precio: precio.target.value });
									}}
								/>
							</div>

							<div className="LABELINPUT">
								<label htmlFor="categorias">Categorias</label>
								<Select
									inputId="categorias"
									isMulti
									name="categorias"
									options={categoriasOpt.map((c: any) => ({
										value: c,
										label: Capitalize(c),
									}))}
									className="basic-multi-select"
									classNamePrefix="select"
									value={producto.categorias}
									onChange={handdleCategorias}
									placeholder="Filtrar categoria"
								/>
							</div>

							<div className="LABELINPUT">
								<label htmlFor="marcas">Marca</label>
								<Select
									inputId="marcas"
									name="marcas"
									options={marcasOpt.map((m: any) => ({
										value: m,
										label: Capitalize(m),
									}))}
									classNamePrefix="select"
									value={producto.marca}
									onChange={handdleMarca}
									placeholder="Filtrar Marca"
								/>
							</div>
							<div className="LABELINPUT">
								<label>Cantidad disponible</label>
								<input
									type="number"
									value={producto.cantidad}
									onChange={(cantidad) => {
										handdleProducto({ cantidad: cantidad.target.value });
									}}
								/>
							</div>
							<hr />
							{/* imagenes */}
							<div className="LABELINPUT">
								<label>
									Imagenes (maximo {maxImg} imagenes), {imagenesPreview.length}{' '}
									subidas
								</label>
								<br />
								<label htmlFor="imagenes">
									<div className="UPLOADIMAGELOGO">
										<i className="far fa-image"></i>
										<i className="fas fa-upload"></i>
									</div>
								</label>
								<input
									id="imagenes"
									type="file"
									multiple
									onChange={handdleImagenes}
									accept="image/png, image/jpeg"
									style={{ display: 'none' }}
								/>

								{imagenesPreview.length > 0 && (
									<div className="IMAGEPREVIEW">
										<br />
										{imagenesPreview.map((img: any, i: number) => {
											return (
												<>
													<img key={i} src={img} alt="imagen" />
												</>
											);
										})}
									</div>
								)}
								<br />
							</div>
							<hr />
							{subir && <h3>SUBIENDO PRODUCTO ESPERA...</h3>}
							{errSubir && (
								<VentanaModal
									titulo={'Error al subir'}
									onClose={() => {
										setSubir(false);
										setSubido(false);
										setErrSubir(false);
										setErrSubirMSG('');
									}}
								>
									{errSubirMSG}
								</VentanaModal>
							)}
							{subido && (
								<VentanaModal
									titulo="Producto subido"
									onClose={() => {
										handdleBorrarContenido();
										window.location.href = '/nortesoladm';
									}}
								>
									{subidoMsg}
								</VentanaModal>
							)}
							<br />
							<BotonFAColores1
								backgroundColor="#48d597"
								disabled={!puedeSubir}
								onClick={actualizarProducto}
							>
								{!puedeSubir ? (
									subir ? (
										'Subiendo producto, espera'
									) : (
										'Faltan campos por llenar'
									)
								) : (
									<>
										Subir Producto&nbsp;
										<i className="fas fa-arrow-up"></i>
									</>
								)}
							</BotonFAColores1>
							<br />

							<br />
							<br />
						</>
					)}
					{/* PREVIEW */}
					{preview && (
						<>
							<h1 className="TITULOSFORM">PREVISUALIZACIÓN</h1>
							<hr />
							<h1 className="producto__titulo">
								{producto.nombre ? Capitalize(producto.nombre) : 'Sin titulo'}
							</h1>

							{imagenesPreview.length > 0 ? (
								<ProductoHead
									precio={producto.precio}
									imagenes={imagenesPreview}
								/>
							) : (
								<ProductoHead precio={producto.precio} />
							)}
							<ProductoBody contenido={producto.descripcion} />
							<hr />
							<ProductoRelacionados />
							<br />
						</>
					)}
				</>
			)}
		</>
	);
};

export default EditarProducto;
