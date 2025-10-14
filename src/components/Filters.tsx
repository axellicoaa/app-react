import { useState, useEffect } from "react";

interface FiltersProps {
  onFilter: (search: string, estado: string, prioridad: string) => void;
}

export default function Filters({ onFilter }: FiltersProps) {
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("todos");
  const [prioridad, setPrioridad] = useState("todas");


  useEffect(() => {
    onFilter(search.toLowerCase(), estado, prioridad);
  }, [search, estado, prioridad, onFilter]);

  return (
 
      <section className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-2">Filtros</h3>
        <div className="flex flex-wrap gap-4 mt-2">
          <input
            type="text"
            placeholder="Buscar tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 flex-1 min-w-[180px]"
          />
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="border border-gray-300 rounded px- py-2 flex-1 min-w-[180px]"
          >
            <option value="todos">Todos los estados</option>
            <option value="Abierto">Abierto</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Cerrado">Cerrado</option>
          </select>
          <select
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 flex-1 min-w-[180px]"
          >
            <option value="todas">Todas las prioridades</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>
      </section>

  );
}
