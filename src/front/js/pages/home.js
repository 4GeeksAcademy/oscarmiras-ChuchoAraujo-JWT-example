import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailLogin, setEmailLogin] = useState('')
	const [passwordLogin, setPasswordLogin] = useState('')

	// Funcion de sign up

	const handleSignUp = (e) => {
		e.preventDefault()
		console.log('enviando formulario')

		fetch(process.env.BACKEND_URL + "/api/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"email": email,
				"password": password
			}),
		})

			.then(response => response.json())
			.then((data) => {
				alert(data.msg) // Mandamos alerta al usuario si fue creado correctamente
				setEmail('') // Limpiamos el formulario
				setPassword('') // // Limpiamos el formulario
			})
			.catch(error => console.log('error', error));
	}


	// Funcion de Login

	const handleLogin = (e) => {
		e.preventDefault()
		console.log('enviando formulario')

		fetch(process.env.BACKEND_URL + "/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"email": emailLogin,
				"password": passwordLogin
			}),
		})

			.then(response => response.json())
			.then((data) => {
				// Extraemos el token de la data
				const { token } = data;
				 // Guardar el token en el localStorage
				 localStorage.setItem('accessToken', token);
				 // Observamos que el token haya sido generado
				 console.log(data.token)
				 // Redireccionamos al usuario a la pagina
				 navigate("/user")
			})
			.catch(error => console.log('error', error));
	}

	return (
		<div className="text-center mt-5">

			<div>
				<form onSubmit={handleSignUp}>
					<legend>Sign up</legend>

					<div className="m-3">
						<label htmlFor="email">Email:</label>
						<input
							className="ms-2"
							id="email" type="email" placeholder="Escribe tu email"
							value={email} onChange={e => setEmail(e.target.value)}
						/>
					</div>

					<div className="m-3">
						<label htmlFor="password">Password:</label>
						<input
							className="ms-2"
							id="password" type="password" placeholder="Escribe tu password"
							value={password} onChange={e => setPassword(e.target.value)}
						/>
					</div>

					<input
						className="btn btn-success"
						type="submit" />
				</form>
			</div>

			<div className="mt-5">
				<form onSubmit={handleLogin}>
					<legend>Login</legend>

					<div className="m-3">
						<label htmlFor="email">Email:</label>
						<input
							className="ms-2"
							id="email" type="email" placeholder="Escribe tu email"
							value={emailLogin} onChange={e => setEmailLogin(e.target.value)}
						/>
					</div>

					<div className="m-3">
						<label htmlFor="password">Password:</label>
						<input
							className="ms-2"
							id="password" type="password" placeholder="Escribe tu password"
							value={passwordLogin} onChange={e => setPasswordLogin(e.target.value)}
						/>
					</div>

					<input
						className="btn btn-warinig"
						type="submit" />
				</form>
			</div>
		</div>
	);
};
