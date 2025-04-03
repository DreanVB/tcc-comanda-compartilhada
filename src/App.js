import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AuthForm from './components/AuthForm';
import AdmPage from './components/AdmPage';
import RestaurantePage from './components/RestaurantePage';

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [token, setToken] = useState('');
  const [user, setUser] = useState({
    id: '',
    name: "Teste",
    email: "teste@email.com",
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
    } catch (error) {
      console.error("❌ Erro no login:", error);
      // setNotification("Usuário ou senha inválidos");
    }
  };
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
        console.log(result.id)
        if(result.id==1){
          setUser(result)
          setCurrentPage('admpage')
        }
        else{
          setUser(result)
          setCurrentPage('restaurantepage')
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchDadosProtegidos();
  }, [token]);

  // Faz a requisição protegida somente quando o token muda
  // executa quando o token for atualizado

  return (
    <div className='App'>
      {notification && <p>{notification}</p>}

      {currentPage === "home" && (
        <AuthForm onLogin={handleLogin} />
      )}
      {currentPage === "admpage" && <AdmPage user={user} token={token}/>}
      {currentPage === "restaurantepage" && <RestaurantePage user={user} token={token}/>}
    </div>
  );
}

export default App;
