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
        <button className="bg-[#fff] text-black rounded px-5 py-2 hover:bg-soft right-100 flex items-center">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-search w-4 h-4 mr-2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          Buscar Ticket
        </button>
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
