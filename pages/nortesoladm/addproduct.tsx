/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import BotonFAColores1 from '../../components/general/BotonFAColores1';
import VentanaModal from '../../components/general/VentanaModal';
import Volver from '../../components/general/Volver';
import EditorTexto from '../../components/nortesoladm/EditorTexto';
import ProductoBody from '../../components/venta/ProductoBody';
import ProductoHead from '../../components/venta/ProductoHead';
import ProductoRelacionados from '../../components/venta/ProductoRelacionados';
import useActualizarImagenProducto from '../../hooks/useActualizarImagen';
import useCrearProducto from '../../hooks/useCrearProducto';

const Addproduct = ({ auth, me }: any) => {
	if (!auth || !me.admin) {
		window.location.href = '/';
		return null;
	}
	const [contenidoToUpload, setContenidoToUpload] = useState('');
	// const [imagenesToUpload, setImagenesToUpload] = useState<any>({});
	const [confirmarBorrar, setConfirmarBorrar] = useState(false);
	const [title, setTitle] = useState('');
	const [precio, setPrecio] = useState(9999999);
	const [categorias, setCategorias] = useState<any>([]);
	const [cantidadDisponible, setCantidadDisponible] = useState(0);
	const [imagenes, setImagenes] = useState<any>([]);
	const [imagenesPreview, setImagenesPreview] = useState<any>([]);
	const [siguiente, setSiguiente] = useState(false);
	const [preview, setPreview] = useState(false);
	const [subir, setSubir] = useState(false);
	const [subido, setSubido] = useState(false);
	const [errSubir, setErrSubir] = useState(false);
	const [errSubirMSG, setErrSubirMSG] = useState('');
	const [subidoMsg, setSubidoMsg] = useState('Producto subido con exito');

	//cantidad maxima de imagenes que se pueden subir
	const maxImg = 2;
	useEffect(() => {
		const contenidoInicial = localStorage.getItem('contenidoNsol982');
		const precioInicial = localStorage.getItem('precioNsol982');
		const cantidadInicial = localStorage.getItem('cantidadDisponibleNsol982');
		const titleInicial = localStorage.getItem('titleNsol982');
		if (contenidoInicial) setContenidoToUpload(contenidoInicial);
		if (precioInicial) setPrecio(parseInt(precioInicial));
		if (cantidadInicial) setCantidadDisponible(parseInt(cantidadInicial));
		if (titleInicial) setTitle(titleInicial);
	}, []);

	const handdleGuardarLocalmente = () => {
		localStorage.setItem('contenidoNsol982', contenidoToUpload);
		// localStorage.setItem("imagenesNsol982", JSON.stringify(imagenesToUpload));
		localStorage.setItem('titleNsol982', title);
		//convert precio to string
		localStorage.setItem('precioNsol982', precio.toString());
		localStorage.setItem(
			'cantidadDisponibleNsol982',
			cantidadDisponible.toString()
		);
		localStorage.setItem('categoriasNsol982', categorias);
	};
	const handdleBorrarContenido = () => {
		localStorage.removeItem('contenidoNsol982');
		// localStorage.removeItem("imagenesNsol982");
		localStorage.removeItem('titleNsol982');
		localStorage.removeItem('precioNsol982');
		localStorage.removeItem('cantidadDisponibleNsol982');
		localStorage.removeItem('categoriasNsol982');
		window.location.href = '/nortesoladm/addproduct';
	};
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
	const handdleTitle = (e: any) => {
		setTitle(e.target.value);
	};
	const handdlePrecio = (e: any) => {
		setPrecio(e.target.value);
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
		setImagenesPreview(dataUrls);
	};
	const handdleCategorias = (e: any) => {
		setCategorias([e.target.value]);
	};
	const handdleCantidadDisponible = (e: any) => {
		setCantidadDisponible(e.target.value);
	};
	//parametro
	const puedeSubir =
		title &&
		categorias &&
		cantidadDisponible &&
		precio &&
		imagenes.length > 0 &&
		!subir;

	const subirProducto = async () => {
		setSubir(true);
		const data = {
			descripcion: contenidoToUpload,
			titulo: title,
			precio: precio,
			categoria: categorias,
			cantidad: cantidadDisponible,
			imagenes,
		};

		const res = await useCrearProducto(data);

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
						setStateContenido={setContenidoToUpload}
						// setStateImagesToUpload={setImagenesToUpload}
						dataInicial={contenidoToUpload}
					/>
				</>
			)}
			{siguiente && !preview && (
				<>
					<h1 className="TITULOSFORM">Datos del producto</h1>
					<hr />
					<div className="LABELINPUT">
						<label>Título</label>
						<input type="text" value={title} onChange={handdleTitle} />
					</div>
					<div className="LABELINPUT">
						<label>Precio</label>
						<input type="number" value={precio} onChange={handdlePrecio} />
					</div>
					<div className="LABELINPUT">
						<label>Categoria</label>
						<input
							type="text"
							value={categorias}
							onChange={handdleCategorias}
						/>
					</div>
					<div className="LABELINPUT">
						<label>Cantidad disponible</label>
						<input
							type="number"
							value={cantidadDisponible}
							onChange={handdleCantidadDisponible}
						/>
					</div>
					<hr />
					{/* imagenes */}
					<div className="LABELINPUT">
						<label>
							Imagenes (maximo {maxImg} imagenes), {imagenes.length} subidas
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
						onClick={subirProducto}
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
			{preview && (
				<>
					<h1 className="TITULOSFORM">PREVISUALIZACIÓN</h1>
					<hr />
					<h1 className="producto__titulo">{title ? title : 'SIN TITULO'}</h1>
					<ProductoHead precio={precio} />
					<ProductoBody contenido={contenidoToUpload} />
					<hr />
					<ProductoRelacionados />
					<br />
				</>
			)}
		</>
	);
};

export default Addproduct;
