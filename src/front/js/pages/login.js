import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/api/login`,
        { email, password }
      );
      const { access_token } = response.data;

      // Guarda el token en el almacenamiento local
      localStorage.setItem("access_token", access_token);
      navigate('/private')
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Error al iniciar sesión. Intenta nuevamente."
      );
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "25rem" }}>
        <h3 className="card-title text-center mb-4">Iniciar Sesión</h3>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-2">
            Iniciar Sesión
          </button>
          <button
            type="button"
            className="btn btn-secondary w-100 mb-2"
            onClick={handleRegisterRedirect}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
