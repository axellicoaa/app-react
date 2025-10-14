import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuscarTicket from "./pages/BuscarTicket";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscar" element={<BuscarTicket />} />
      </Routes>
    </BrowserRouter>
  );
}
