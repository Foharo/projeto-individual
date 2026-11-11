import { useEffect, useState } from "react";
import Main from "../../components/main/Main";
import Botao from "../../components/botao/Botao";
import Alerta from "../../components/alerta/Alerta";
import { api } from "../../services/api";

function Generos() {
  const [generos, setGeneros] = useState([]);
  const [nome, setNome] = useState("");
  const [editandoId, setEditandoId] = useState(null); // null = modo cadastro
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [versao, setVersao] = useState(0); // muda a cada alteração para recarregar a lista
  const carregar = () => setVersao((v) => v + 1);

  // READ: busca os gêneros no backend
  useEffect(() => {
    api
      .listar("generos")
      .then(setGeneros)
      .catch((e) => setErro(e.message));
  }, [versao]);

  function limparFormulario() {
    setNome("");
    setEditandoId(null);
  }

  // CREATE e UPDATE
  async function salvar(evento) {
    evento.preventDefault();
    setErro("");
    setSucesso("");
    try {
      if (editandoId) {
        await api.atualizar("generos", editandoId, { nome });
        setSucesso("Gênero atualizado com sucesso!");
      } else {
        await api.criar("generos", { nome });
        setSucesso("Gênero cadastrado com sucesso!");
      }
      limparFormulario();
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  // Seleciona um registro para edição
  function editar(genero) {
    setEditandoId(genero.id);
    setNome(genero.nome);
    setErro("");
    setSucesso("");
  }

  // DELETE
  async function excluir(genero) {
    if (!window.confirm(`Excluir o gênero "${genero.nome}"?`)) return;
    setErro("");
    setSucesso("");
    try {
      await api.excluir("generos", genero.id);
      setSucesso("Gênero excluído com sucesso!");
      if (editandoId === genero.id) limparFormulario();
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <Main titulo="Gêneros">
      <Alerta tipo="erro" mensagem={erro} />
      <Alerta tipo="sucesso" mensagem={sucesso} />

      <section className="card">
        <h2>{editandoId ? "Editar gênero" : "Novo gênero"}</h2>
        <form className="form" onSubmit={salvar}>
          <div className="campo">
            <label htmlFor="nome">Nome do gênero</label>
            <input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              maxLength={50}
              placeholder="Ex.: RPG"
              required
            />
          </div>
          <Botao type="submit">{editandoId ? "Salvar alterações" : "Cadastrar"}</Botao>
          {editandoId && (
            <Botao variante="neutro" onClick={limparFormulario}>Cancelar</Botao>
          )}
        </form>
      </section>

      <section className="card">
        <h2>Gêneros cadastrados</h2>
        <table className="tabela">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {generos.map((genero) => (
              <tr key={genero.id}>
                <td>{genero.id}</td>
                <td>{genero.nome}</td>
                <td className="acoes">
                  <Botao variante="neutro" onClick={() => editar(genero)}>Editar</Botao>
                  <Botao variante="perigo" onClick={() => excluir(genero)}>Excluir</Botao>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {generos.length === 0 && <p className="vazio">Nenhum gênero cadastrado.</p>}
      </section>
    </Main>
  );
}

export default Generos;
