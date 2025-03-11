import React from 'react';
import './Navbar.css';

// import logo from '../assets/logo2.png';

function Navbar({ onNavigate, user, isAuthenticated }) {
    // Função para gerar as iniciais do nome do usuário, caso não haja imagem
    const getUserInitials = () => {
        if (user && user.name) {
            const names = user.name.split(' ');
            const initials = names[0][0] + (names[1] ? names[1][0] : '');
            return initials.toUpperCase();
        }
        return '';
    };
    isAuthenticated = true;

    const handleProfileClick = () => {
        console.log(isAuthenticated)
        if (isAuthenticated) {
            onNavigate('profile'); // Acessa o perfil se estiver autenticado
        } else {
            onNavigate('auth'); // Redireciona para login/cadastro se não estiver autenticado
        }
    };

    return (
        <nav className="navbar">
            <div className="logo">
                {/* <img src={logo} alt="Logo do Projeto" /> */}
            </div>

            <ul className="nav-links">
                <li>
                    <button className="profile-button" onClick={handleProfileClick}>
                        {user.image ? (
                            <img src={user.image} alt="Perfil do Usuário" className="profile-image" />
                        ) : (
                            <span className="profile-initials">{getUserInitials()}</span>
                        )}
                    </button>
                </li>
                <li>
                    <button onClick={() => onNavigate('itens')}>Itens</button>
                </li>
                <li>
                    <button onClick={() => onNavigate('comanda')}>Comanda</button>
                </li>
                <li>
                    <button onClick={() => onNavigate('CarrinhoList')}>Carrinho</button>
                </li>
            </ul>
            <div className="profile-container">
            </div>
        </nav>
    );
}

export default Navbar;