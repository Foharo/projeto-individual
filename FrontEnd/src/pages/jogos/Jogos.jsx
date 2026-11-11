import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Main from "../../components/main/Main";
import Botao from "../../components/botao/Botao";
import Alerta from "../../components/alerta/Alerta";
import { api } from "../../services/api";
import "./Jogos.css";

const FORM_VAZIO = { titulo: "", desenvolvedora: "", ano: "", preco: "", generoId: "" };

const formatarPreco = (valor) =>
  Number(valor) === 0
    ? "Grátis"
    : Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Cada jogo ganha uma "capa" colorida gerada a partir do seu id
const corDaCapa = (id) => `linear-gradient(135deg, hsl(${(id * 47) % 360} 70% 45%), hsl(${(id * 47 + 60) % 360} 70% 30%))`;

function Jogos() {
  const [jogos, setJogos] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [form, setForm] = useState(FORM_VAZIO);
  const [editandoId, setEditandoId] = useState(null); // null = modo cadastro
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [versao, setVersao] = useState(0); // muda a cada alteração para recarregar a lista
  const carregar = () => setVersao((v) => v + 1);

  // READ: busca jogos e gêneros (os gêneros alimentam o <select>)
  useEffect(() => {
    Promise.all([api.listar("jogos"), api.listar("generos")])
      .then(([listaJogos, listaGeneros]) => {
        setJogos(listaJogos);
        setGeneros(listaGeneros);
      })
      .catch((e) => setErro(e.message));
  }, [versao]);

  function alterarCampo(evento) {
    setForm({ ...form, [evento.target.name]: evento.target.value });
  }

  function limparFormulario() {
    setForm(FORM_VAZIO);
    setEditandoId(null);
  }

  // CREATE e UPDATE
  async function salvar(evento) {
    evento.preventDefault();
    setErro("");
    setSucesso("");
    try {
      if (editandoId) {
        await api.atualizar("jogos", editandoId, form);
        setSucesso("Jogo atualizado com sucesso!");
      } else {
        await api.criar("jogos", form);
        setSucesso("Jogo cadastrado com sucesso!");
      }
      limparFormulario();
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  // Seleciona um registro para edição
  function editar(jogo) {
    setEditandoId(jogo.id);
    setForm({
      titulo: jogo.titulo,
      desenvolvedora: jogo.desenvolvedora,
      ano: String(jogo.ano),
      preco: String(jogo.preco),
      generoId: String(jogo.generoId),
    });
    setErro("");
    setSucesso("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // DELETE
  async function excluir(jogo) {
    if (!window.confirm(`Excluir o jogo "${jogo.titulo}"?`)) return;
    setErro("");
    setSucesso("");
    try {
      await api.excluir("jogos", jogo.id);
      setSucesso("Jogo excluído com sucesso!");
      if (editandoId === jogo.id) limparFormulario();
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <Main titulo="Jogos">
      <Alerta tipo="erro" mensagem={erro} />
      <Alerta tipo="sucesso" mensagem={sucesso} />

      <section className="card">
        <h2>{editandoId ? "Editar jogo" : "Novo jogo"}</h2>
        {generos.length === 0 ? (
          <p className="vazio">
            Cadastre ao menos um <Link to="/generos">gênero</Link> antes de adicionar jogos.
          </p>
        ) : (
          <form className="form" onSubmit={salvar}>
            <div className="campo campo-largo">
              <label htmlFor="titulo">Título</label>
              <input
                id="titulo"
                name="titulo"
                value={form.titulo}
                onChange={alterarCampo}
                maxLength={100}
                required
              />
            </div>
            <div className="campo campo-largo">
              <label htmlFor="desenvolvedora">Desenvolvedora</label>
              <input
                id="desenvolvedora"
                name="desenvolvedora"
                value={form.desenvolvedora}
                onChange={alterarCampo}
                maxLength={100}
                required
              />
            </div>
            <div className="campo">
              <label htmlFor="ano">Ano de lançamento</label>
              <input
                id="ano"
                name="ano"
                type="number"
                min="1970"
                max="2100"
                value={form.ano}
                onChange={alterarCampo}
                required
              />
            </div>
            <div className="campo">
              <label htmlFor="preco">Preço (R$)</label>
              <input
                id="preco"
                name="preco"
                type="number"
                min="0"
                step="0.01"
                value={form.preco}
                onChange={alterarCampo}
                required
              />
            </div>
            <div className="campo">
              <label htmlFor="generoId">Gênero</label>
              <select
                id="generoId"
                name="generoId"
                value={form.generoId}
                onChange={alterarCampo}
                required
              >
                <option value="">Selecione...</option>
                {generos.map((genero) => (
                  <option key={genero.id} value={genero.id}>{genero.nome}</option>
                ))}
              </select>
            </div>
            <div className="form-botoes">
              <Botao type="submit">{editandoId ? "Salvar alterações" : "Cadastrar jogo"}</Botao>
              {editandoId && (
                <Botao variante="neutro" onClick={limparFormulario}>Cancelar</Botao>
              )}
            </div>
          </form>
        )}
      </section>

      <h2 className="titulo-secao">Catálogo ({jogos.length})</h2>
      {jogos.length === 0 && <p className="vazio">Nenhum jogo cadastrado.</p>}

      <div className="jogos-grade">
        {jogos.map((jogo) => (
          <article className="jogo-card" key={jogo.id}>
            <div className="jogo-capa" style={{ background: corDaCapa(jogo.id) }}>
              <span>{jogo.titulo.charAt(0).toUpperCase()}</span>
              <em className="jogo-genero">{jogo.genero?.nome}</em>
            </div>
            <div className="jogo-corpo">
              <h3>{jogo.titulo}</h3>
              <p className="jogo-info">{jogo.desenvolvedora} • {jogo.ano}</p>
              <p className="jogo-preco">{formatarPreco(jogo.preco)}</p>
              <div className="jogo-acoes">
                <Botao variante="neutro" onClick={() => editar(jogo)}>Editar</Botao>
                <Botao variante="perigo" onClick={() => excluir(jogo)}>Excluir</Botao>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Main>
  );
}

export default Jogos;
