import './Botao.css'

function Botao(props) {
  return (
    <button className = 'botao'>
        {props.titulo}
        {props.titulo2}
    </button>
  )
}

export default Botao;