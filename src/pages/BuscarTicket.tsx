import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";

export default function BuscarTicket() {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto mt-16 bg-white shadow-md rounded-2xl p-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
      >
        <ArrowLeft size={18} /> Volver
      </button>

      <h2 className="text-2xl font-bold mb-2">Buscar Ticket</h2>
      <p className="text-gray-500 mb-6">Ingresa el código del ticket</p>

      <div className="border p-6 rounded-xl bg-gray-50 mb-6">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Search size={18} /> Búsqueda por Código
        </h3>
        <input
          type="text"
          placeholder="Ej: TK-001"
          className="w-full border rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring focus:ring-gray-300"
        />
        <button className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800">
          Buscar Ticket
        </button>
      </div>

      <div className="border p-6 rounded-xl bg-gray-50">
        <h3 className="font-semibold mb-3">Tickets de Ejemplo</h3>
        <div className="flex gap-3">
          {["TK-001", "TK-002", "TK-003"].map((code) => (
            <button
              key={code}
              className="border rounded-lg px-4 py-2 hover:bg-gray-200 transition"
            >
              {code}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}