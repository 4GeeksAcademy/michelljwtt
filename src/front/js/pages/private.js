import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Private() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem("access_token");
        navigate("/login");
    };

    return (
        <div className="container mt-5">
            <h2>Página Privada</h2>
            <p>Bienvenido a la página privada. Solo los usuarios autenticados pueden ver esto.</p>
            <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
        </div>
    );
}