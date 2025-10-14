import { Ticket } from "../types/Ticket";

const API_URL = "http://localhost:3000/tickets";

export async function fetchTickets(): Promise<Ticket[]> {
  const res = await fetch(API_URL);
  
  if (!res.ok) {
    throw new Error(`Error HTTP ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

export async function createTicket(ticket: Ticket) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });

  if (!res.ok) {
    throw new Error("No se pudo crear el ticket");
  }
}

export async function updateTicket(id: string, data: Partial<Ticket>) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("No se pudo actualizar el ticket");
  }
}

export async function deleteTicket(id: string) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

  if (!res.ok) {
    throw new Error("No se pudo eliminar el ticket");
  }
}
