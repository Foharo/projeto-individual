import "./Main.css";

// Área central padrão das páginas: título + conteúdo.
function Main({ titulo, children }) {
  return (
    <main className="main">
      {titulo && <h1>{titulo}</h1>}
      {children}
    </main>
  );
}

export default Main;
