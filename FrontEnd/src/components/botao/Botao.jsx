import "./Botao.css";

// variante: "primario" (padrão), "perigo" ou "neutro"
function Botao({ children, variante = "primario", type = "button", ...resto }) {
  return (
    <button type={type} className={`botao botao-${variante}`} {...resto}>
      {children}
    </button>
  );
}

export default Botao;
