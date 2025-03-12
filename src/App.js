import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AuthForm from './components/AuthForm';
// import CarrinhoList from './components/CarrinhoList';



function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [Usuarios, setUsuarios]= useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: "Teste",
    email: "teste@email.com",
    image: "",
  });
  const [notification, setNotification] = useState(null); // Estado para notificação

  const handleLogin = async (email, senha) => {    
    try {
      const resposta = await axios.post('https://apicardapiodigital-dagph7bqfhg4cbbc.brazilsouth-01.azurewebsites.net/api/Auth', {
        "email": email,
        "senha": senha
      });
      console.log(resposta.data.token)
      localStorage.setItem('token', resposta.data.token);
      setNotification('Login realizado com sucesso!');
    } catch (erro) {
      console.error('Erro ao fazer login:', erro);
      setNotification('Email ou senha inválidos.');
    }
    
  };
  
  return (
    <div className='App'>
    {currentPage === "home" && (
      <AuthForm onLogin={handleLogin} />
    )}</div>
  )
}
  
  export default App;
