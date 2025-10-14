import { useNavigate } from "react-router-dom";
import { Ticket } from "../types/Ticket";
export default function Detalles() { 
    const navigate = useNavigate();

    return (
        <div className="max-w-lg mx-auto mt-16 bg-white shadow-md rounded-2xl p-8">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-600 hover:text-black mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver
            </button>

            <h2 className="text-2xl font-bold mb-2">Detalles del Ticket</h2>
            <p className="text-gray-500 mb-6">Ingresa el código del ticket</p>

            <div className="border p-6 rounded-xl bg-gray-50 mb-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Detalles del Ticket
                </h3>
                <div className="flex gap-3">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="titulo" className="text-gray-500">
                            Título
                        </label>
                        <input type="text" id="titulo" className="w-full border rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring focus:ring-gray-300" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="cliente" className="text-gray-500">
                            Cliente
                        </label>
                        <input type="text" id="cliente" className="w-full border rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring focus:ring-gray-300" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="descripcion" className="text-gray-500">
                            Descripción
                        </label>
                        <textarea id="descripcion" className="w-full border rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring focus:ring-gray-300"></textarea>    
                        <label htmlFor="prioridad" className="text-gray-500">
                            Prioridad
                        </label>
                        <select id="prioridad" className="w-full border rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring focus:ring-gray-300">
                            <option value="Alta">Alta</option>
                            <option value="Media">Media</option>
                            <option value="Baja">Baja</option>
                        </select>
                    </div>
                </div>
            </div>

            
        </div>
    )
}       