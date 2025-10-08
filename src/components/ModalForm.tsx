import { useState } from "react";
import { Ticket } from "../types/Ticket";
import { createTicket } from "../service/api";

interface ModalFormProps {
  onClose: () => void;
  refresh: () => void;
  tickets: Ticket[];
}

export default function ModalForm({ onClose, refresh, tickets }: ModalFormProps) {
  const [titulo, setTitulo] = useState("");
  const [cliente, setCliente] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [asignado, setAsignado] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nuevoTicket: Ticket = {
      id: `TK-${(tickets.length + 1).toString().padStart(3, "0")}`,
      titulo,
      cliente,
      descripcion,
      prioridad: prioridad as "Alta" | "Media" | "Baja",
      estado: "Abierto",
      asignado,
      fecha: new Date().toISOString().split("T")[0],
    };
    await createTicket(nuevoTicket);
    refresh();
    onClose();  

  }
  return (    
  
    <div className="fixed inset-0 z-10 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-[600px] max-w-[90%]">
        <h2 className="text-xl font-bold mb-2">Crear Nuevo Ticket</h2>
        <p className="mb-4">Completa la información para crear un nuevo ticket de soporte</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 flex flex-col">
              <label className="font-semibold">Título</label>
              <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} required className="border border-gray-300 rounded px-3 py-2" />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="font-semibold">Cliente</label>
              <input type="text" value={cliente} onChange={e => setCliente(e.target.value)} required className="border border-gray-300 rounded px-3 py-2" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Descripción</label>
            <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} required className="border border-gray-300 rounded px-3 py-2 resize-vertical" />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 flex flex-col">
              <label className="font-semibold">Prioridad</label>
              <select value={prioridad} onChange={e => setPrioridad(e.target.value)} required className="border border-gray-300 rounded px-3 py-2">
                <option value="">Selecciona prioridad</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col">
              <label className="font-semibold">Asignado a</label>
              <input type="text" value={asignado} onChange={e => setAsignado(e.target.value)} required className="border border-gray-300 rounded px-3 py-2" />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-[#111] text-white rounded hover:bg-gray-800">Crear Ticket</button>
          </div>
        </form>
      </div>
    </div>
  );
}

