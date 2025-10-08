import { Ticket } from "../types/Ticket";

interface StatsProps {
  tickets: Ticket[];
}
export default function Stats({ tickets }: StatsProps) {
    const abierto = tickets.filter(ticket => ticket.estado === "Abierto").length;
    const enProgreso = tickets.filter(ticket => ticket.estado === "En Progreso").length;
    const cerrado = tickets.filter(ticket => ticket.estado === "Cerrado").length;

  return (
    <section className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))] mb-6">
      <div className="bg-white p-4 rounded shadow">
        <p>Total Tickets</p>
        <h2 className="text-xl font-bold mt-1">{tickets.length}</h2>
      </div>
      <div className="bg-white p-4 rounded shadow border-l-4 border-red-600">
        <p>Abiertos</p>
        <h2 className="text-xl font-bold mt-1">{abierto}</h2>
      </div>
      <div className="bg-white p-4 rounded shadow border-l-4 border-yellow-400">
        <p>En Progreso</p>
        <h2 className="text-xl font-bold mt-1">{enProgreso}</h2>
      </div>
      <div className="bg-white p-4 rounded shadow border-l-4 border-green-500">
        <p>Cerrados</p>
        <h2 className="text-xl font-bold mt-1">{cerrado}</h2>
      </div>
    </section>
  );
}