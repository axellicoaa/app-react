import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuscarTicket from "./pages/BuscarTicket";
import TicketDetail from "./pages/TicketDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscar" element={<BuscarTicket />} />
        <Route path="/ticket/:id" element={<TicketDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
