import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const User = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		getFavorites()
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
			})
			.catch(error => console.log('error', error));
	}

	return (
		<div className="container">
are aprivate
		</div>
	);
};
