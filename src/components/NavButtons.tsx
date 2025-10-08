interface NavButtonsProps {
  onDashboard: () => void;
  onTickets: () => void;
}

export default function NavButtons({
  onDashboard,
  onTickets,
}: NavButtonsProps) {
  return (
    <div className="flex gap-4 mb-6">
      <button
        type="button"
        onClick={onTickets}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition"
      >
        Lista de Tickets
      </button>
      <button
        type="button"
        onClick={onDashboard}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition"
      >
        Dashboard
      </button>
    </div>
  );
}
