import { Ticket } from "../types/Ticket";

const API_URL = "http://localhost:3000/tickets";

export async function fetchTickets(): Promise<Ticket[]> {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createTicket(ticket: Ticket) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });
}

export async function updateTicket(id: string, data: Partial<Ticket>) {
  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteTicket(id: string) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
