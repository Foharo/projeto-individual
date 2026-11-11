import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-conteudo">
        <span className="header-logo">Cadastro</span>
        <nav>
          <NavLink to="/" end>Início</NavLink>
          <NavLink to="/pessoas">Pessoas</NavLink>
          <NavLink to="/cargos">Cargos</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
