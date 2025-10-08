import { Ticket } from "../types/Ticket";

interface Props {
  tickets: Ticket[];
}

export default function Dashboard({ tickets }: Props) {
  const abiertos = tickets.filter((t) => t.estado === "Abierto").length;
  const progreso = tickets.filter((t) => t.estado === "En Progreso").length;
  const cerrados = tickets.filter((t) => t.estado === "Cerrado").length;

  const asignaciones: Record<string, number> = {};
  tickets.forEach(
    (t) => (asignaciones[t.asignado] = (asignaciones[t.asignado] || 0) + 1)
  );

  return (
    <section className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Resumen de Actividad
          </h3>
          <div className="space-y-2 text-gray-700">
            <p className="flex justify-between">
              <span>Tickets Abiertos</span>
              <span className="font-bold text-red-600">{abiertos}</span>
            </p>
            <p className="flex justify-between">
              <span>En Progreso</span>
              <span className="font-bold text-yellow-500">{progreso}</span>
            </p>
            <p className="flex justify-between">
              <span>Cerrados</span>
              <span className="font-bold text-green-600">{cerrados}</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Asignaciones por Usuario
          </h3>
          <div className="space-y-2 text-gray-700">
            {Object.entries(asignaciones).length > 0 ? (
              Object.entries(asignaciones).map(([nombre, cantidad]) => (
                <p
                  key={nombre}
                  className="flex justify-between border-b border-gray-100 pb-1"
                >
                  <span>{nombre}</span>
                  <span className="font-medium text-gray-800">{cantidad}</span>
                </p>
              ))
            ) : (
              <p className="text-gray-500 italic">No hay asignaciones aún.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
