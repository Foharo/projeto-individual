const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Função genérica para falar com o backend.
// Lança um Error com a mensagem enviada pela API quando algo dá errado.
async function requisicao(caminho, opcoes = {}) {
  let resposta;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      headers: { "Content-Type": "application/json" },
      ...opcoes,
    });
  } catch {
    throw new Error("Não foi possível conectar ao servidor. O backend está rodando?");
  }

  if (resposta.status === 204) return null;

  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) throw new Error(dados.erro || "Erro ao processar a requisição.");
  return dados;
}

export const api = {
  listar: (recurso) => requisicao(`/${recurso}`),
  criar: (recurso, corpo) =>
    requisicao(`/${recurso}`, { method: "POST", body: JSON.stringify(corpo) }),
  atualizar: (recurso, id, corpo) =>
    requisicao(`/${recurso}/${id}`, { method: "PUT", body: JSON.stringify(corpo) }),
  excluir: (recurso, id) => requisicao(`/${recurso}/${id}`, { method: "DELETE" }),
};

export default API_URL;
