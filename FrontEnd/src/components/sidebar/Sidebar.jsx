import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-icone">🎮</span>
        <span>GameVault</span>
      </div>
      <nav className="sidebar-menu">
        <NavLink to="/" end>🏠 Início</NavLink>
        <NavLink to="/jogos">🕹️ Jogos</NavLink>
        <NavLink to="/generos">🏷️ Gêneros</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
