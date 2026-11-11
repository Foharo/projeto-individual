import "./Alerta.css";

// tipo: "erro" ou "sucesso". Não mostra nada se não houver mensagem.
function Alerta({ tipo = "erro", mensagem }) {
  if (!mensagem) return null;
  return <div className={`alerta alerta-${tipo}`} role="alert">{mensagem}</div>;
}

export default Alerta;
