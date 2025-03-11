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

  useEffect(() => {
    axios.get('https://suaapi.com/api/usuarios')
      .then(response => setUsuarios(response.data))
      .catch(error => console.error('Erro na API:', error));
  }, []);
  const handleLogin = async (email, password) => {
    const hashedPassword = generateHash(password);
    // Busca o usuário no banco
    // const { data, error } = await supabase
    //   .from("user")
    //   .select("*") // Seleciona todos os campos
    //   .eq("email", email)
    //   .eq("password", hashedPassword);

    // if (error) {
    //   console.error("Erro ao buscar o usuário:", error);
    //   setNotification({ message: "Erro ao fazer login.", type: "error" });
    //   return;
    // }

    // // Verifica se o usuário existe
    // if (!data || data.length === 0) {
    //   setNotification({
    //     message: "Email e/ou senha incorretos.",
    //     type: "error",
    //   });
    //   return;
    // }

    // // Extrai os dados do usuário (primeiro elemento do array)
    // const loggedUser = data[0];
    // // Armazena o ID do usuário no sessionStorage
    // sessionStorage.setItem("user_id", loggedUser.id);
    // // Define o estado com as informações do usuário
    // setUser({
    //   name: loggedUser.name || "user", // Usa o nome do banco ou um padrão
    //   email: loggedUser.email,
    //   image: loggedUser.image || "", // Se houver imagem armazenada
    // });

    // setIsAuthenticated(true);
    // setCurrentPage("profile");
  };
  const generateHash = (inputText) => {
    // const sha1Hash = CryptoJS.SHA1(inputText).toString();
    // return sha1Hash;
  };





  return (
    <div className='App'>
    {currentPage === "home" && (
      <AuthForm onLogin={handleLogin} />
    )}</div>
  )
}
  
  export default App;
