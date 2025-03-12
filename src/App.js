import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AuthForm from './components/AuthForm';
// {
//   "email": "cardapiodigital@gmail.com",
//   "senha": "admin@123"
// }

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
      const response = await axios.post("/api/Auth", {
        email: email,
        senha: senha
      });
  
      console.log("✅ Login bem-sucedido:", response.data);
      // Exemplo: salvar token ou usuário logado
      setIsAuthenticated(true);
      setUser(response.data); // ou ajuste conforme o formato do retorno
      localStorage.setItem("token", response.token);
      fetchAdminProfile(response.token)  
    } catch (error) {
      console.error("❌ Erro no login:", error);
      setNotification("Usuário ou senha inválidos");
    }
  };
  const fetchAdminProfile = async (token) => {
    try {
      const response = await axios.get(
        '/swagger/index.html', // Substitua o URL pelo endpoint real
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Perfil do Administrador:", response.data);
      setUser(response.data); // Atualizando dados do usuário (admin)
    } catch (error) {
      console.error("❌ Erro ao buscar perfil de admin:", error);
      setNotification("Erro ao acessar perfil de administrador");
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
