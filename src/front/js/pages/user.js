import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const User = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
		es mi pagina privada
		</div>
	);
};
