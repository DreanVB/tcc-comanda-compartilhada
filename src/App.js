import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AuthForm from './components/AuthForm';
import page from './components/AuthForm';

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [token, setToken] = useState('');
  const [user, setUser] = useState({
    name: "Teste",
    email: "teste@email.com",
    image: "",
  });
  const [notification, setNotification] = useState(null);

  const handleLogin = async (email, senha) => {
    try {
      const response = await axios.post("/api/Auth", {
        email: email,
        senha: senha
      });

      console.log("✅ Login bem-sucedido:", response.data);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.usuario || {}); // ajuste se a API devolver diferente

    } catch (error) {
      console.error("❌ Erro no login:", error);
      // setNotification("Usuário ou senha inválidos");
    }
  };

  // Faz a requisição protegida somente quando o token muda
  useEffect(() => {
    if (!token) return;

    const fetchDadosProtegidos = async () => {
      try {
        const response = await fetch("/api/Restaurante/meus-dados", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        });

        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const result = await response.json();
        console.log("🔐 Dados protegidos:", result);
        // setCurrentPage('pageInicial')
    
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchDadosProtegidos();
  }, [token]); // executa quando o token for atualizado

  return (
    <div className='App'>
      {notification && <p>{notification}</p>}

      {currentPage === "home" && (
        <AuthForm onLogin={handleLogin} />
      )}
      {currentPage === "pageInicial" && (
        <AuthForm onLogin={page} />
      )}
    </div>
  );
}

export default App;
