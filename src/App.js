
import './App.css';
import Navbar from "./components/Navbar";
import React, { useState } from "react";



function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: "Teste",
    email: "teste@email.com",
    image: "",
  });
  const handlePageChange = (page) => {
    if (page === "profile" && !isAuthenticated) {
      setCurrentPage("auth");
    } else {
      setCurrentPage(page);
    }
  };
  
  

  

 

  

  

  

  
  return (
    <div className='App'>
      <Navbar onNavigate={handlePageChange} user={user} />
    </div>
  );
}

export default App;
