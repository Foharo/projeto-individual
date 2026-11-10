import { Link } from 'react-router-dom';
import './Header.css'

function Header() {
  

  return (
    <header className='header'>
      <h1 className='h1'>Sistema de Cargos e Pessoas</h1>
      <div className='div'>
        <img src="public/pica-pau.png" alt="" className='img'/>
        <img src="public/pica-pau-2.jpg" alt="" className='img'/>
      </div>
         <nav className='link'>
                <Link to="/">Início</Link>
                {' | '}
                <Link to="/pessoas">Pessoas</Link>
                {' | '}
                <Link to="/cargos">Cargos</Link>
            </nav>
    </header>
    
  );
}

export default Header;
