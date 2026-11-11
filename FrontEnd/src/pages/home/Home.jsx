import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Main from "../../components/main/Main";
import { api } from "../../services/api";
import "./Home.css";

function Home() {
  const [totais, setTotais] = useState(null);

  // Busca os números exibidos nos contadores
  useEffect(() => {
    Promise.all([api.listar("jogos"), api.listar("generos")])
      .then(([jogos, generos]) => setTotais({ jogos: jogos.length, generos: generos.length }))
      .catch(() => setTotais(null));
  }, []);

  return (
    <Main>
      <section className="hero">
        <p className="hero-etiqueta">LOJA DE JOGOS DIGITAIS</p>
        <h1>Bem-vindo ao GameVault</h1>
        <p className="hero-texto">
          Gerencie o catálogo de jogos da loja: cadastre títulos, organize por gênero
          e mantenha tudo atualizado.
        </p>
        <div className="hero-botoes">
          <Link to="/jogos" className="hero-link hero-link-primario">Ver jogos</Link>
          <Link to="/generos" className="hero-link">Gerenciar gêneros</Link>
        </div>
      </section>

      <section className="contadores">
        <div className="contador">
          <strong>{totais ? totais.jogos : "–"}</strong>
          <span>jogos no catálogo</span>
        </div>
        <div className="contador">
          <strong>{totais ? totais.generos : "–"}</strong>
          <span>gêneros cadastrados</span>
        </div>
      </section>
    </Main>
  );
}

export default Home;
