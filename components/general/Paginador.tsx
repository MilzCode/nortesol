/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';

/*
Este componente es un paginador.
utiliza el hook state para manejar el estado de la paginación.
Recibe:
    -maxPaginas: el numero maximo de paginas que se mostraran.
    -pagina: el numero de pagina actual que debe iniciar con 1 debe ser parte de un state.
    -setPagina: el setter de pagina, debe controlar el parametro pagina.
*/

interface propsPaginador {
	maxPagina: number;
	pagina: number;
	setPagina: (pagina: number) => void;
	loading?: boolean;
}

const Paginador = ({
	maxPagina = 0,
	pagina = 0,
	setPagina,
	loading = false,
}: propsPaginador) => {
	//maxPagina son las paginas disponibles
	// const maxPagina = 100;
	//sino hay paginas que no se despliegue el componente
	if (maxPagina < 1) return null;
	//si la pagina inicial es disinta a 1 se deja en 1
	// useEffect(() => {
	// 	pagina !== 1 && setPagina(1);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);
	//con pagina mostrar Dato indicamos cuantas paginas se mostraran en el paginador sin contar ni la primera ni la ultima
	const paginasMostrarDato = 5;

	const [paginasMostrar, setPaginasMostrar] = useState(0);
	const [cargarCadaNpaginas, setCargarCadaNpaginas] = useState(0);
	const maxPaginasDesplegable = 50;
	const paginasMostrarPorLado = Math.floor(paginasMostrar / 2);
	const paginasDespliguePorLado = Math.floor(maxPaginasDesplegable / 2);

	const [paginador, setPaginador] = useState(false);
	const [lastNextPagina, setLastNextPagina] = useState(cargarCadaNpaginas);
	const [lastPrevPagina, setLastPrevPagina] = useState(cargarCadaNpaginas);
	//parte desde el 2 por eso i+2 ej: si paginas para mostrar = 4 entonces 2,3,4,5 (sin contar la primera ni ultima)
	const [paginas, setPaginas] = useState<any>(
		[...Array(paginasMostrar)].map((_, i) => i + 2)
	);
	const handdlePaginador = () => {
		setPaginador(!paginador);
	};

	const handdlePagina = (e: any, first = false) => {
		const paginaSelect = !first ? parseInt(e.target.innerHTML) : 1;
		if (paginaSelect === pagina) return;
		if (maxPagina <= paginasMostrarDato) {
			setPagina(paginaSelect);
			return;
		}
		if (paginaSelect === 1 || paginaSelect === maxPagina) {
			paginaSelect === 1
				? loadNextPages(paginaSelect)
				: loadPrevPages(paginaSelect);
			setPagina(paginaSelect);
			return;
		}
		if (paginaSelect <= 1 + paginasMostrarPorLado) {
			setPaginas([...Array(paginasMostrar)].map((_, i) => i + 2));
			setLastNextPagina(cargarCadaNpaginas);
			setLastPrevPagina(cargarCadaNpaginas);
			setPagina(paginaSelect);
			return;
		} else if (paginaSelect >= maxPagina - paginasMostrarPorLado) {
			setPaginas(
				[...Array(paginasMostrar)].map((_, i) => i + maxPagina - paginasMostrar)
			);
			setLastPrevPagina(maxPagina - cargarCadaNpaginas);
			setPagina(paginaSelect);
			return;
		}
		setPaginas(
			[...Array(paginasMostrar)].map(
				(_, i) => i + paginaSelect - paginasMostrarPorLado
			)
		);
		setLastNextPagina(paginaSelect + paginasMostrarPorLado);
		setLastPrevPagina(paginaSelect - paginasMostrarPorLado);
		setPagina(paginaSelect);
	};
	const loadNextPages = (nuevaPagina: number) => {
		if (nuevaPagina === maxPagina) return;
		if (nuevaPagina === 1) {
			setPaginas([...Array(paginasMostrar)].map((_, i) => i + nuevaPagina + 1));
			setLastNextPagina(nuevaPagina + cargarCadaNpaginas);
			setLastPrevPagina(nuevaPagina - 1);
			return;
		}
		if (nuevaPagina + cargarCadaNpaginas < maxPagina) {
			setPaginas([...Array(paginasMostrar)].map((_, i) => i + nuevaPagina));
			setLastNextPagina(nuevaPagina + cargarCadaNpaginas);
			setLastPrevPagina(nuevaPagina - 1);
			return;
		}
		setPaginas(
			[...Array(paginasMostrar)].map((_, i) => maxPagina - paginasMostrar + i)
		);
		setLastNextPagina(nuevaPagina + cargarCadaNpaginas);
		setLastPrevPagina(nuevaPagina - 1);
	};
	const loadPrevPages = (nuevaPagina: number) => {
		if (nuevaPagina === 1) return;
		if (nuevaPagina === maxPagina) {
			if (maxPagina < paginasMostrar + 2) {
				setPaginas(
					[...Array(paginasMostrar)].map(
						(_, i) => i + nuevaPagina - cargarCadaNpaginas
					)
				);
			} else {
				setPaginas(
					[...Array(paginasMostrar)].map(
						(_, i) => i + nuevaPagina - cargarCadaNpaginas - 1
					)
				);
			}

			setLastPrevPagina(nuevaPagina - cargarCadaNpaginas);
			setLastNextPagina(nuevaPagina + 1);
			return;
		}
		if (nuevaPagina - cargarCadaNpaginas > 1) {
			setPaginas(
				[...Array(paginasMostrar)].map(
					(_, i) => i + nuevaPagina - cargarCadaNpaginas
				)
			);
			setLastPrevPagina(nuevaPagina - cargarCadaNpaginas);
			setLastNextPagina(nuevaPagina + 1);
			return;
		}
		setPaginas([...Array(paginasMostrar)].map((_, i) => i + 2));
		setLastPrevPagina(nuevaPagina - cargarCadaNpaginas);
		setLastNextPagina(nuevaPagina + 1);
	};

	const handdleNext = () => {
		//en este caso ademas de comprobar la siguiente pagina si no hay mas paginas no es necesario buscar mas paginas para
		//el paginador
		if (pagina === maxPagina) return;

		pagina + 1 === lastNextPagina &&
			maxPagina > paginasMostrar + 1 &&
			loadNextPages(pagina + 1);
		maxPagina !== pagina && setPagina(pagina + 1);
	};
	const handdlePrev = () => {
		if (pagina === 1) return;
		pagina - 1 === lastPrevPagina && loadPrevPages(pagina - 1);
		pagina !== 1 && setPagina(pagina - 1);
	};

	const handdleDesplegarPaginador = () => {
		if (maxPagina <= maxPaginasDesplegable) {
			return (
				<>
					{[...Array(maxPagina)].map((_, i) => (
						<div
							draggable={false}
							key={i + 1}
							className={`paginador__pagina ${
								pagina === i + 1 && 'paginador__pagina--activo'
							} NOSELECT`}
							onClick={handdlePagina}
						>
							{i + 1}
						</div>
					))}
				</>
			);
		}
		//si puede desplegar  hacia ambos lados desde las paginas de despliegue por lado
		if (
			pagina - paginasDespliguePorLado > 0 &&
			pagina + paginasDespliguePorLado < maxPagina
		) {
			return (
				<>
					{[...Array(maxPaginasDesplegable)].map((_, i) => (
						<div
							draggable={false}
							key={i + pagina - paginasDespliguePorLado + 1}
							className={`paginador__pagina ${
								pagina === i + pagina - paginasDespliguePorLado + 1 &&
								'paginador__pagina--activo'
							} NOSELECT`}
							onClick={handdlePagina}
						>
							{i + pagina - paginasDespliguePorLado + 1}
						</div>
					))}
				</>
			);
		}
		//si la pagina esta cerca del inicio se despliega desde el inicio el paginador
		if (pagina - paginasDespliguePorLado < 2) {
			return (
				<>
					{[...Array(maxPaginasDesplegable)].map((_, i) => (
						<div
							draggable={false}
							key={i + 1}
							className={`paginador__pagina ${
								pagina === i + 1 && 'paginador__pagina--activo'
							} NOSELECT`}
							onClick={handdlePagina}
						>
							{i + 1}
						</div>
					))}
				</>
			);
		}
		//si la pagina esta cerca del final se despliega desde el final el paginador
		if (pagina + paginasDespliguePorLado > maxPagina - 1) {
			return (
				<>
					{[...Array(maxPaginasDesplegable)].map((_, i) => (
						<div
							draggable={false}
							key={i + maxPagina - maxPaginasDesplegable + 1}
							className={`paginador__pagina ${
								pagina === i + maxPagina - maxPaginasDesplegable + 1 &&
								'paginador__pagina--activo'
							} NOSELECT`}
							onClick={handdlePagina}
						>
							{i + maxPagina - maxPaginasDesplegable + 1}
						</div>
					))}
				</>
			);
		}
	};
	useEffect(() => {
		let paginasMostrar_ =
			paginasMostrarDato > maxPagina
				? maxPagina - 1
				: maxPagina === paginasMostrarDato
				? paginasMostrarDato - 1
				: paginasMostrarDato;

		setPaginasMostrar(paginasMostrar_);
		setPaginas([...Array(paginasMostrar_)].map((_, i) => i + 2));
		setCargarCadaNpaginas(paginasMostrar_ - 1);
		setLastNextPagina(paginasMostrar_ - 1);
	}, [maxPagina]);

	return (
		<>
			{!loading && paginasMostrar > 0 && (
				<div className="paginador" draggable={false}>
					<div className="paginador__anterior" draggable={false}>
						<i
							className={`fas fa-sort-down ${
								pagina === 1 && 'paginador__disabled'
							}`}
							onClick={handdlePrev}
						/>
					</div>
					<div
						className={`paginador__pagina ${
							pagina === 1 && 'paginador__pagina--activo'
						} NOSELECT`}
						onClick={handdlePagina}
					>
						{1}
					</div>
					{paginas[0] > 2 && <i className="NOSELECT">...</i>}
					{paginas.map((pag: any) => (
						<div
							key={pag}
							className={`paginador__pagina ${
								pagina === pag && 'paginador__pagina--activo'
							} NOSELECT`}
							onClick={handdlePagina}
						>
							{pag}
						</div>
					))}
					{paginas[paginasMostrar - 1] < maxPagina - 1 && (
						<i className="NOSELECT">...</i>
					)}
					{maxPagina > paginasMostrar + 1 && (
						<div
							className={`paginador__pagina ${
								pagina === maxPagina && 'paginador__pagina--activo'
							} NOSELECT`}
							onClick={handdlePagina}
							//+1 porque incluye la pagina final
						>
							{maxPagina}
						</div>
					)}

					<div
						className={'paginador__pagina paginador__paginaDesplegar NOSELECT'}
						onClick={handdlePaginador}
						onMouseLeave={() => {
							paginador && handdlePaginador();
						}}
						// +3 ya que incluye la pagina de incio mas la pagina final mas la pagina a desplegar y buscar
						style={{
							display: maxPagina > paginasMostrar + 3 ? 'inherit' : 'none',
						}}
					>
						...
						{paginador && (
							<div className="paginador__desplegable">
								{handdleDesplegarPaginador()}
							</div>
						)}
					</div>

					<div className="paginador__siguiente" draggable={false}>
						<i
							className={`fas fa-sort-down ${
								pagina === maxPagina && 'paginador__disabled'
							}`}
							onClick={handdleNext}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default Paginador;
