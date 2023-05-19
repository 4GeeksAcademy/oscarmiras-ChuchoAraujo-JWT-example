import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { Context } from "../store/appContext";

export const User = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const [favorites, setFavorites] = useState([])
	const [userName, setUserName] = useState('')

	useEffect(() => {
		const token = localStorage.getItem('accessToken');

		if(!token){
			navigate("/")
		}
		else {
			getFavorites()
		}
		
	}, [])

	const getFavorites = () => {
		// Obtener el token de acceso del localStorage
		const token = localStorage.getItem('accessToken');

		fetch(process.env.BACKEND_URL + "/api/private", {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${token}`
			  }
		})

			.then(response => response.json())
			.then((data) => {
				console.log(data)
				setFavorites(data.user.favorites)
				setUserName(data.user.email)
			})
			.catch(error => console.log('error', error));
	}

	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		navigate("/")
	}

	return (

		<div className="container text-center mt-5">
			<h1>Favorites of <strong className="fw-bold text-success">{userName}</strong></h1>
		<div className="row mt-4">
			{favorites.map((fav, i) => (
				<div className="col-3" key={i}>
					<img src={fav.url}/>
					<p className="fw-bold text-success">{fav.name}</p>
					<p>{fav.type}</p>
				</div>
			))}
		</div>

		<button className="btn btn-primary" onClick={handleLogout}>Cerrar sesión</button>

		</div>
	);
};
