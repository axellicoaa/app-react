export interface Ticket {
  id: string;
  titulo: string;
  cliente: string;
  descripcion: string;
  prioridad: "Alta" | "Media" | "Baja";
  estado: "Abierto" | "En Progreso" | "Cerrado";
  asignado: string;
  fecha: string;
}
