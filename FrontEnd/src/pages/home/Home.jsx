import { Link } from "react-router-dom";
import Main from "../../components/main/Main";
import "./Home.css";

function Home() {
  return (
    <Main titulo="Cadastro de Pessoas e Cargos">
      <p className="home-texto">
        Sistema simples para gerenciar pessoas e os cargos que elas ocupam.
        Escolha uma opção abaixo.
      </p>
      <div className="home-cards">
        <Link to="/pessoas" className="home-card">
          <h2>Pessoas</h2>
          <p>Cadastrar, listar, editar e excluir pessoas.</p>
        </Link>
        <Link to="/cargos" className="home-card">
          <h2>Cargos</h2>
          <p>Cadastrar, listar, editar e excluir cargos.</p>
        </Link>
      </div>
    </Main>
  );
}

export default Home;
