import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Ticket } from "../types/Ticket";
import { fetchTickets } from "../service/api";

  function getPriorityClass(p: Ticket["prioridad"]) {
    return p === "Alta" ? "bg-red-600" : p === "Media" ? "bg-gray-800" : "bg-gray-400";
  }

  function getStatusClass(e: Ticket["estado"]) {
    return e === "Abierto" ? "bg-red-600" : e === "En Progreso" ? "bg-yellow-400 text-black" : "bg-green-500";
  }


interface Comment {
  id: number;
  autor: string;
  mensaje: string;
  fecha: string;
  tipo?: "estado" | "comentario";
}

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comentarios, setComentarios] = useState<Comment[]>([]);
  const [nuevoComentario, setNuevoComentario] = useState("");

  useEffect(() => {
    const loadTicket = async () => {
      const allTickets = await fetchTickets();
      const found = allTickets.find((t) => t.id === id);
      setTicket(found || null);

      // Simulamos comentarios de ejemplo (puedes traerlos de un endpoint real si quieres)
      setComentarios([
        {
          id: 1,
          autor: "Juan Pérez",
          mensaje: "Ticket creado. Investigando el problema del sistema de login.",
          fecha: "2024-01-15 10:30",
          tipo: "comentario",
        },
        {
          id: 2,
          autor: "Sistema",
          mensaje: "Estado cambiado de 'Nuevo' a 'Abierto'",
          fecha: "2024-01-15 10:31",
          tipo: "estado",
        },
        {
          id: 3,
          autor: "Juan Pérez",
          mensaje:
            "He identificado que el problema está relacionado con la base de datos. Trabajando en una solución.",
          fecha: "2024-01-15 14:20",
          tipo: "comentario",
        },
      ]);
    };
    loadTicket();
  }, [id]);

  const handleAddComment = () => {
    if (!nuevoComentario.trim()) return;

    const nuevo: Comment = {
      id: Date.now(),
      autor: "Tú",
      mensaje: nuevoComentario,
      fecha: new Date().toISOString().slice(0, 16).replace("T", " "),
      tipo: "comentario",
    };

    setComentarios((prev) => [...prev, nuevo]);
    setNuevoComentario("");
  };

  if (!ticket) {
    return (
      <div className="max-w-2xl mx-auto mt-16 bg-white shadow rounded-lg p-8 text-center">
        <p className="text-red-600 text-lg">❌ Ticket no encontrado</p>
        <button
          onClick={() => navigate("/buscar")}
          className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
        >
          Volver a Buscar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-16 bg-white shadow-md rounded-2xl p-8 space-y-8">
      {/* 🔙 Botón Volver */}
      <button
        onClick={() => navigate("/buscar")}
        className="flex items-center gap-2 text-gray-600 hover:text-black"
      >
        <ArrowLeft size={18} /> Volver
      </button>

      {/* 🏷️ Título y subtítulo */}
      <div>
        <h1 className="text-3xl font-bold">Ticket {ticket.id}</h1>
        <p className="text-gray-500">{ticket.titulo}</p>
      </div>

      {/* 📊 Secciones principales */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Información del Ticket */}
        <div className="md:col-span-2 border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Información del Ticket</h2>
          <p className="text-gray-700">{ticket.descripcion}</p>
        </div>

        {/* Estado y Prioridad */}
        <div className="border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Estado y Prioridad</h2>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Estado: </span>
              <span
                className={`px-2 py-1 rounded text-white text-sm ${getStatusClass(
                  ticket.estado
                )}`}
              >
                {ticket.estado.toUpperCase()}
              </span>
            </div>
            <div>
              <span className="font-semibold">Prioridad: </span>
              <span
                className={`px-2 py-1 rounded text-white text-sm ${getPriorityClass(
                  ticket.prioridad
                )}`}
              >
                {ticket.prioridad.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Información Adicional */}
      <div className="grid md:grid-cols-4 gap-6 border rounded-xl p-6">
        <div>
          <h3 className="font-semibold text-gray-600 text-sm mb-1">Cliente</h3>
          <p>{ticket.cliente}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-600 text-sm mb-1">Asignado a</h3>
          <p>{ticket.asignado}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-600 text-sm mb-1">
            Fecha de Creación
          </h3>
          <p>{ticket.fecha}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-600 text-sm mb-1">
            Última Actualización
          </h3>
          <p>{ticket.fecha}</p>
        </div>
      </div>

      {/* 💬 Comentarios */}
      <div className="border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Actividad y Comentarios</h2>
        <div className="space-y-4 mb-4">
          {comentarios.map((c) => (
            <div key={c.id} className="border-b pb-3">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{c.autor}</span>
                  {c.tipo === "estado" && (
                    <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                      Cambio de Estado
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">{c.fecha}</span>
              </div>
              <p className="text-gray-700">{c.mensaje}</p>
            </div>
          ))}
        </div>

        {/* ✍️ Agregar comentario */}
        <div>
          <textarea
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            placeholder="Escribe tu comentario aquí..."
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring focus:ring-gray-300 mb-3"
            rows={3}
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
          >
            Agregar Comentario
          </button>
        </div>
      </div>
    </div>
  );
}
