import  Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import Pessoas from "./pages/pessoas/Pessoas"
import Cargos from "./pages/cargos/Cargos"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pessoas" element={<Pessoas />} />
                <Route path="/cargos" element={<Cargos />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}
export default App
