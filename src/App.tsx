import { useEffect, useState } from "react";
import Header from "./components/Header";
import Stats from "./components/Stats";
import { Ticket } from "./types/Ticket";
import { fetchTickets } from "./service/api";
import ModalForm from "./components/ModalForm";
import TicketTable from "./components/TicketTable";
import Filters from "./components/Filters";
import NavButtons from "./components/NavButtons";
import Dashboard from "./components/Dashborad";

export default function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [viewDashboard, setViewDashboard] = useState(false);

  useEffect(() => {
    loadTickets();
  }, []);

  async function loadTickets() {
    const data = await fetchTickets();
    setTickets(data);
    setFilteredTickets(data);
  }

  function handleFilter(search: string, estado: string, prioridad: string) {
    const filtered = tickets.filter((t) => {
      const matchSearch =
        t.titulo.toLowerCase().includes(search) ||
        t.cliente.toLowerCase().includes(search) ||
        t.asignado.toLowerCase().includes(search) ||
        t.id.toLowerCase().includes(search);

      const matchEstado = estado === "todos" || t.estado === estado;
      const matchPrioridad = prioridad === "todas" || t.prioridad === prioridad;

      return matchSearch && matchEstado && matchPrioridad;
    });
    setFilteredTickets(filtered);
  }

  return (
    <div className="max-w-[1200px] mx-auto p-8 bg-[#f7f9fb] text-[#222]">
      <Header onOpenModal={() => setShowModal(true)} />
      <Stats tickets={tickets} />

      <NavButtons
        onDashboard={() => setViewDashboard(true)}
        onTickets={() => setViewDashboard(false)}
      />

      {viewDashboard ? (
        <Dashboard tickets={tickets} />
      ) : (
        <>
          <Filters onFilter={handleFilter} />
          <TicketTable tickets={filteredTickets} />
        </>
      )}

      {showModal && (
        <ModalForm
          onClose={() => setShowModal(false)}
          refresh={loadTickets}
          tickets={tickets}
        />
      )}
    </div>
  );
}
