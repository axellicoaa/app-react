import { Ticket } from "../types/Ticket";

interface TitleTableProps {
  tickets: Ticket[];
}
export default function TitleTable({ tickets }: TitleTableProps) {

    const count = tickets.length;

    return (
        <div>
            <h2 className="text-1.5xl font-bold">   
                Tickets ({count})
            </h2>
        </div>
    )
}