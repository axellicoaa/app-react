import { useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import Stats from "../components/Stats";
import { Ticket } from "../types/Ticket";
import { fetchTickets } from "../service/api";
import ModalForm from "../components/ModalForm";
import TicketTable from "../components/TicketTable";
import Filters from "../components/Filters";
import NavButtons from "../components/NavButtons";
import Dashboard from "../components/Dashborad";
import TitleTable from "../components/TitleTable";

export default function Home() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [viewDashboard, setViewDashboard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTickets();
  }, []);

  async function loadTickets() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTickets();
      setTickets(data);
      setFilteredTickets(data);
    } catch (err) {
      console.error("Error al cargar tickets:", err);
      setError("No se pudo cargar la información. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleFilter = useCallback(
    (search: string, estado: string, prioridad: string) => {
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
    },
    [tickets]
  );

  if (isLoading) {
    return <div className="p-10 text-center">⏳ Cargando tickets...</div>;
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-600">
        <p>❌ {error}</p>
        <button
          onClick={loadTickets}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Reintentar
        </button>
      </div>
    );
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
          <TitleTable tickets={tickets} />
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
