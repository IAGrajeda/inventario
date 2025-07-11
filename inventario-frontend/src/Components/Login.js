import { useState } from "react";

function Login({ onLogin }) {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [rol, setRol] = useState("Administrador");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!usuario || !password) {
            setError("Por favor, completa todos los campos.");
            return;
        }
        if (
            (rol === "Administrador" && password !== "admin123") ||
            (rol === "Almacenista" && password !== "user123")
        ) {
            setError("Contraseña incorrecta.");
            return;
        }

        setError("");
        onLogin({ usuario, rol });
    }


    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-6 rounded shadow-lg flex flex-col gap-4 border border-gray-700 w-full max-w-sm"
            >
                <h2 className="text-2xl text-green-400 font-bold text-center">Iniciar sesión</h2>
                <input
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    placeholder="Usuario"
                    className="p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <select
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                    className="p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="Administrador">Administrador</option>
                    <option value="Almacenista">Almacenista</option>
                </select>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default Login;