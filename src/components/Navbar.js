import React from 'react';
import './Navbar.css';
import OutputIcon from '@mui/icons-material/Output';
import CategoryIcon from '@mui/icons-material/Category';

// import logo from '../assets/logo2.png';

function Navbar({ user, token, categoriaSituation, setCategoriaSituation }) {

    return (
        <nav className="navbar">
            <div className="logo">
                {/* <img src={logo} alt="Logo do Projeto" /> */}
            </div>

            <ul className="nav-links">
                <li>
                    <button className="profile-button" >
                        {user.image ? (
                            <img src={user.image} alt="Perfil do Usuário" className="profile-image" />
                        ) : (
                            <span className="profile-initials"></span>
                        )}
                    </button>
                </li>
                <li>
                    <p>{user.nome}</p>
                </li>
                <li>
                    <button
                    onClick={()=>setCategoriaSituation(true)}>
                        <CategoryIcon/>
                    </button>
                
                    <button>
                        <OutputIcon />
                    </button>
                </li>
                {/* <li>
                    <button >Itens</button>
                </li>
                <li>
                    <button >Comanda</button>
                </li>
                <li>
                    <button >Carrinho</button>
                </li> */}
            </ul>
            <div className="profile-container">
            </div>
        </nav>
    );
}

export default Navbar;