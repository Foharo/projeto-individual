import Botao from '../../components/botao/Botao';
import './Home.css'

function Home(){
    return(
        <>
        <div className='home-container'>
            <h2 className='h2'><b>Bem Vindo ao menu de acesso</b></h2>
            <Botao  titulo = "Aperte aqui"/>
        </div>
        </>
    );
}

export default Home;