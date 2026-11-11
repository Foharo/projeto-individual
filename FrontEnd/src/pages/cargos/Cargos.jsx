import { useEffect, useState } from "react";
import Main from "../../components/main/Main";
import Botao from "../../components/botao/Botao";
import Alerta from "../../components/alerta/Alerta";
import { api } from "../../services/api";

function Cargos() {
  const [cargos, setCargos] = useState([]);
  const [nome, setNome] = useState("");
  const [editandoId, setEditandoId] = useState(null); // null = modo cadastro
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const [versao, setVersao] = useState(0); // muda a cada alteração para recarregar a lista
  const carregar = () => setVersao((v) => v + 1);

  // READ: busca os cargos no backend
  useEffect(() => {
    api
      .listar("cargos")
      .then(setCargos)
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
        await api.atualizar("cargos", editandoId, { nome });
        setSucesso("Cargo atualizado com sucesso!");
      } else {
        await api.criar("cargos", { nome });
        setSucesso("Cargo cadastrado com sucesso!");
      }
      limparFormulario();
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  // Seleciona um registro para edição
  function editar(cargo) {
    setEditandoId(cargo.id);
    setNome(cargo.nome);
    setErro("");
    setSucesso("");
  }

  // DELETE
  async function excluir(cargo) {
    if (!window.confirm(`Excluir o cargo "${cargo.nome}"?`)) return;
    setErro("");
    setSucesso("");
    try {
      await api.excluir("cargos", cargo.id);
      setSucesso("Cargo excluído com sucesso!");
      if (editandoId === cargo.id) limparFormulario();
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <Main titulo="Cargos">
      <Alerta tipo="erro" mensagem={erro} />
      <Alerta tipo="sucesso" mensagem={sucesso} />

      <section className="card">
        <h2>{editandoId ? "Editar cargo" : "Novo cargo"}</h2>
        <form className="form" onSubmit={salvar}>
          <div className="campo">
            <label htmlFor="nome">Nome do cargo</label>
            <input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              maxLength={50}
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
        <h2>Cargos cadastrados</h2>
        <table className="tabela">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cargos.map((cargo) => (
              <tr key={cargo.id}>
                <td>{cargo.id}</td>
                <td>{cargo.nome}</td>
                <td className="acoes">
                  <Botao variante="neutro" onClick={() => editar(cargo)}>Editar</Botao>
                  <Botao variante="perigo" onClick={() => excluir(cargo)}>Excluir</Botao>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {cargos.length === 0 && <p className="vazio">Nenhum cargo cadastrado.</p>}
      </section>
    </Main>
  );
}

export default Cargos;
