import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSignOut from '../../../hooks/useSignOut';
import useCantidadTotalCarrito from '../../../hooks/useCantidadTotalCarrito';

const Header = ({ auth }: any) => {
	const router = useRouter();
	const path = router.asPath.split('?')[0];
	const isPathCarrito = path === '/carrito';
	const [miCuenta, setMiCuenta] = useState(false);
	const [subHeader, setSubHeader] = useState(false);
	const [carritoCant, setCarritoCant] = useState(0);
	const handdleMiCuenta = () => {
		setMiCuenta(!miCuenta);
	};

	const handdleSubmit = (e: any) => {
		e.preventDefault();
		router.push('/search');
	};

	async function salir() {
		try {
			await useSignOut();
			window.location.replace('/');
		} catch (error) {}
	}
	useEffect(() => {
		//@ts-ignore
		setCarritoCant(useCantidadTotalCarrito());
	}, [path]);
	return (
		<>
			<header className="header NOSELECT">
				<Link passHref href="/">
					<img
						className="header__logo"
						src="/static/img/logoNortesol.png"
						alt="logo"
					/>
				</Link>
				<div className="header__contacto">
					<i className="fas fa-phone-square" />
					<span>Contacto</span>
				</div>
				<form className="header__buscador" onSubmit={(e) => handdleSubmit(e)}>
					<input type="text" placeholder="Buscar" />
					<button type="submit">
						<i className="fas fa-search" />
						<span className="TEXTINVISIBLE">buscar articulo</span>
					</button>
				</form>
				{auth ? (
					<div
						className="header__miCuenta"
						onClick={handdleMiCuenta}
						onMouseLeave={() => {
							miCuenta && handdleMiCuenta();
						}}
					>
						<i className="fas fa-user" />
						<span>Mi cuenta</span>
						<i className="fas fa-sort-down" />
						{miCuenta && (
							<div className="header__miCuentaDesplegable">
								<Link passHref href="/user">
									<div className="header__desplegableOpcion">Mi cuenta</div>
								</Link>
								<div className="header__desplegableOpcion" onClick={salir}>
									Cerrar Sesión
								</div>
							</div>
						)}
					</div>
				) : (
					auth === null && (
						<Link passHref href="/login">
							<div className="header__ingresar">
								<i className="fas fa-user" />
								<span>Ingresar</span>
							</div>
						</Link>
					)
				)}
				<Link passHref href="/carrito">
					<div className="header__carrito">
						<i className="fas fa-shopping-cart" />
						{carritoCant > 0 && !isPathCarrito && (
							<div className="header__carrito-contador">
								<p>{carritoCant}</p>
							</div>
						)}
					</div>
				</Link>
				<div
					className="header__subMenuDesplegar"
					onClick={() => setSubHeader(!subHeader)}
				>
					{subHeader ? (
						<i className="fas fa-times" />
					) : (
						<i className="fas fa-bars" />
					)}
				</div>
			</header>

			<nav
				className={`subHeader ${
					!subHeader && 'subHeader--desaparecer'
				} NOSELECT`}
			>
				<div className="subHeader__menu">
					<p className="subHeader__menuItem">
						<i className="fas fa-home"></i>
						<span className="TEXTINVISIBLE">Inicio</span>
					</p>
					<p className="subHeader__menuItem">Productos</p>
					<p className="subHeader__menuItem">Servicios</p>
					<p className="subHeader__menuItem">Contacto</p>
					<p className="subHeader__menuItem">Contacto</p>
				</div>
			</nav>
		</>
	);
};

export default Header;
