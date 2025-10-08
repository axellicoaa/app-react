import { Ticket } from "../types/Ticket";
import { updateTicket, deleteTicket } from "../service/api";

interface TicketTableProps {
  tickets: Ticket[];
}

export default function TicketTable({ tickets }: TicketTableProps) {
  function getPriorityClass(p: Ticket["prioridad"]) {
    return p === "Alta" ? "bg-red-600" : p === "Media" ? "bg-gray-800" : "bg-gray-400";
  }

  function getStatusClass(e: Ticket["estado"]) {
    return e === "Abierto" ? "bg-red-600" : e === "En Progreso" ? "bg-yellow-400 text-black" : "bg-green-500";
  }

  async function handleEdit(ticket: Ticket) {
    const nuevoEstado = prompt (`Estado actual: ${ticket.estado}\nNuevo estado (Abierto / En Progreso / Cerrado):`, ticket.estado);
    if (nuevoEstado && nuevoEstado !== ticket.estado) {
      await updateTicket(ticket.id, { estado: nuevoEstado as Ticket["estado"] });
      window.location.reload();
    }
  }

  async function handleDelete(ticket: Ticket) {
    if (confirm(`¿Eliminar ticket ${ticket.id}?`)) {
      await deleteTicket(ticket.id);
      window.location.reload();
    }
  }

  return (
    <section className="bg-white rounded shadow overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 font-semibold">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Título</th>
            <th className="px-4 py-2">Cliente</th>
            <th className="px-4 py-2">Prioridad</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Asignado</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t.id} className="border-b">
               <a href=""> <td className="px-4 py-2"><span className={`text-black text-sm font-extralight`}>{t.id} </span></td></a> 
              <td className="px-4 py-2" > <span className={`text-black text-sm font-extralight`}>{t.titulo} </span></td>
              <td className="px-4 py-2"><span className={`text-black text-sm font-extralight`}>{t.cliente} </span></td>
              <td className="px-4 py-2">
                <span className={`text-white text-xs font-extralight  px-2 py-1 rounded ${getPriorityClass(t.prioridad)}`}>
                  {t.prioridad.toUpperCase()}
                </span>
              </td>
              <td className="px-4 py-2">
                <span className={`text-white text-xs font-extralight px-2 py-1 rounded ${getStatusClass(t.estado)}`}>
                  {t.estado.toUpperCase()}
                </span>
              </td>
              <td className="px-4 py-2"><span className={`text-black text-sm font-extralight`}>{t.asignado} </span></td>
              <td className="px-4 py-2"><span className={`text-black text-sm font-extralight`}>{t.fecha} </span></td>
              <td className="px-4 py-2 flex gap-2">
                <button className="px-0.5 py-1     border rounded hover:bg-gray-100:" onClick={() => handleEdit(t)}>✏️</button>
                <button className="px-0.5 py-1 border rounded hover:bg-gray-100" onClick={() => handleDelete(t)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}