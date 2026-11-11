import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Main from "../../components/main/Main";
import Botao from "../../components/botao/Botao";
import Alerta from "../../components/alerta/Alerta";
import { api } from "../../services/api";

const FORM_VAZIO = { nome: "", email: "", cargoId: "" };

function Pessoas() {
  const [pessoas, setPessoas] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [form, setForm] = useState(FORM_VAZIO);
  const [editandoId, setEditandoId] = useState(null); // null = modo cadastro
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const [versao, setVersao] = useState(0); // muda a cada alteração para recarregar a lista
  const carregar = () => setVersao((v) => v + 1);

  // READ: busca pessoas e cargos (os cargos alimentam o <select>)
  useEffect(() => {
    Promise.all([api.listar("pessoas"), api.listar("cargos")])
      .then(([listaPessoas, listaCargos]) => {
        setPessoas(listaPessoas);
        setCargos(listaCargos);
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
        await api.atualizar("pessoas", editandoId, form);
        setSucesso("Pessoa atualizada com sucesso!");
      } else {
        await api.criar("pessoas", form);
        setSucesso("Pessoa cadastrada com sucesso!");
      }
      limparFormulario();
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  // Seleciona um registro para edição
  function editar(pessoa) {
    setEditandoId(pessoa.id);
    setForm({ nome: pessoa.nome, email: pessoa.email, cargoId: String(pessoa.cargoId) });
    setErro("");
    setSucesso("");
  }

  // DELETE
  async function excluir(pessoa) {
    if (!window.confirm(`Excluir "${pessoa.nome}"?`)) return;
    setErro("");
    setSucesso("");
    try {
      await api.excluir("pessoas", pessoa.id);
      setSucesso("Pessoa excluída com sucesso!");
      if (editandoId === pessoa.id) limparFormulario();
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <Main titulo="Pessoas">
      <Alerta tipo="erro" mensagem={erro} />
      <Alerta tipo="sucesso" mensagem={sucesso} />

      <section className="card">
        <h2>{editandoId ? "Editar pessoa" : "Nova pessoa"}</h2>
        {cargos.length === 0 ? (
          <p className="vazio">
            Cadastre ao menos um <Link to="/cargos">cargo</Link> antes de cadastrar pessoas.
          </p>
        ) : (
          <form className="form" onSubmit={salvar}>
            <div className="campo">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                name="nome"
                value={form.nome}
                onChange={alterarCampo}
                maxLength={100}
                required
              />
            </div>
            <div className="campo">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={alterarCampo}
                maxLength={100}
                required
              />
            </div>
            <div className="campo">
              <label htmlFor="cargoId">Cargo</label>
              <select
                id="cargoId"
                name="cargoId"
                value={form.cargoId}
                onChange={alterarCampo}
                required
              >
                <option value="">Selecione...</option>
                {cargos.map((cargo) => (
                  <option key={cargo.id} value={cargo.id}>{cargo.nome}</option>
                ))}
              </select>
            </div>
            <Botao type="submit">{editandoId ? "Salvar alterações" : "Cadastrar"}</Botao>
            {editandoId && (
              <Botao variante="neutro" onClick={limparFormulario}>Cancelar</Botao>
            )}
          </form>
        )}
      </section>

      <section className="card">
        <h2>Pessoas cadastradas</h2>
        <table className="tabela">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Cargo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pessoas.map((pessoa) => (
              <tr key={pessoa.id}>
                <td>{pessoa.id}</td>
                <td>{pessoa.nome}</td>
                <td>{pessoa.email}</td>
                <td>{pessoa.cargo?.nome}</td>
                <td className="acoes">
                  <Botao variante="neutro" onClick={() => editar(pessoa)}>Editar</Botao>
                  <Botao variante="perigo" onClick={() => excluir(pessoa)}>Excluir</Botao>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pessoas.length === 0 && <p className="vazio">Nenhuma pessoa cadastrada.</p>}
      </section>
    </Main>
  );
}

export default Pessoas;
