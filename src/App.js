import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AuthForm from './components/AuthForm';
import AdmPage from './components/AdmPage';
import RestaurantePage from './components/RestaurantePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function App() {
  const navigate = useNavigate();
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
          navigate("/admpage");
        }
        else{
          setUser(result)
          navigate("/restaurante");
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
       
            <div>            
              <Routes>
                <Route path="/login" element={<AuthForm onLogin={handleLogin}/>} />
                <Route path="/admpage" element={<AdmPage user={user} token={token}/>} /> 
                <Route path="/restaurante" element={<RestaurantePage user={user} token={token}/>} />
                <Route path="*" element={<AuthForm onLogin={handleLogin} />} />
              </Routes>
            </div>
          
    </div>
  );
}

export default App;
