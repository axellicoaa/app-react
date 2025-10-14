import { Link } from "react-router-dom";

interface HeaderProps {
  onOpenModal: () => void;
}

export default function Header({ onOpenModal }: HeaderProps) {
  return (
    <header className="flex flex-wrap justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold">Sistema de Tickets</h1>
        <p className="text-gray-500">
          Gestiona y da seguimiento a todos los tickets de soporte
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4 md:mt-0">
        <Link
          to="/buscar"
          className="bg-white text-black rounded px-5 py-2 hover:bg-gray-100 flex items-center"
        >
          Buscar Ticket
        </Link>
        <button
          onClick={onOpenModal}
          className="bg-[#111] text-white rounded px-4 py-2 hover:bg-gray-800"
        >
          + Nuevo Ticket
        </button>
      </div>
    </header>
  );
}
