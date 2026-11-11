import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Jogos from "./pages/jogos/Jogos";
import Generos from "./pages/generos/Generos";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />
        <div className="coluna">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jogos" element={<Jogos />} />
            <Route path="/generos" element={<Generos />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
