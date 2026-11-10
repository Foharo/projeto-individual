import { useEffect, useState } from 'react';
import API_URL from "../../services/api.js";
import './Pessoas.css'

function Pessoas() {

    const [pessoas, setPessoas] = useState([]);

    useEffect(() => {
        
    async function buscarPessoas() {
        const resposta = await fetch(`${API_URL}/pessoas`);
        const dados = await resposta.json();

        setPessoas(dados);
        console.log(dados);
    }
        buscarPessoas();
    }, []);


    return (
        <div>
            <h2 className='titulo'>Pessoas cadastradas</h2>

            {pessoas.map((pessoa) => (
                <div  className='paragrafo'>
                    <p key={pessoa.id_pess}>
                    {pessoa.nome_pess}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Pessoas;