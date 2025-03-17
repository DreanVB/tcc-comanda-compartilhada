import React, { useState, useEffect } from "react";
import './AdmPage.css';
import { useNavigate } from "react-router-dom"; 

function AdmPage(user) {
  const [restaurantList, setRestaurantList] = useState([]);

  
  useEffect(() => {
    buscarRestaurantes();
  }, []);

  const buscarRestaurantes = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${user.user.token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("/api/Restaurante/listar-todos", requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log("Restaurantes:", data);
        setRestaurantList(data);
      })
      .catch((error) => console.error("Erro ao buscar restaurantes:", error));
  };

  const desativaRestaurante = (restaurante) => {
    if (restaurante.status == 1) {
      const confirmed = window.confirm(`Você deseja reativar o restaurante: ${restaurante.nome}?`)
        if (confirmed) {
          handleAtivar(restaurante.id);
        }
     }
    else {
      if (restaurante.id != 1) {


        const confirmed = window.confirm(`Você deseja desativar o restaurante: ${restaurante.nome}?`)
        if (confirmed) {
          // Faça a exclusão
          handleInativar(restaurante.id);
        }
      }
      else {
        alert(`Você não pode desativar o perfil ${restaurante.nome}`)
      }
    }
  };

  const openRestaurantDetails = (restaurante) => {
  };
  const handleInativar = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user.user.token);
    myHeaders.append("Cookie", "ARRAffinity=..."); // pode remover se não for usado

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: "", // ← vazio mesmo
      redirect: "follow"
    };

    fetch(`api/Restaurante/${id}/inativar`, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao inativar");
        return response.text();
      })
      .then((result) => {
        console.log("Resultado:", result);
        alert("Restaurante inativado com sucesso!");
        buscarRestaurantes();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao inativar restaurante.");
      });
  };
  const handleAtivar = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user.user.token);
    myHeaders.append("Cookie", "ARRAffinity=..."); // pode remover se não for usado

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: "", // ← vazio mesmo
      redirect: "follow"
    };

    fetch(`api/Restaurante/${id}/ativar`, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao inativar");
        return response.text();
      })
      .then((result) => {
        console.log("Resultado:", result);
        alert("Restaurante ativado com sucesso!");
        buscarRestaurantes();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao nativar restaurante.");
      });
  };



  return (
    <div className="container mt-4">
      <h2>Bem-vindo</h2>
      <p>Nome: {user.user.user.nome}</p>
      <p>Email: {user.user.user.email}</p>

      <h4 className="mt-4">Restaurantes Cadastrados</h4>

      <div className="table-responsive">
        <table className="table table-bordered table-hover mt-3">
          <thead className="thead-dark">
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {restaurantList.map((restaurante) => (
              <tr key={restaurante.id}>
                <td>{restaurante.id}</td>
                <td>{restaurante.nome}</td>
                <td>{restaurante.email}</td>
                <td>{restaurante.status ? <button
                    className="btn btn-sm btn-success"
                    onClick={() => desativaRestaurante(restaurante)}
                  >
                    Ativar
                  </button> : <button
                    className="btn btn-sm btn-danger"
                    onClick={() => desativaRestaurante(restaurante)}
                  >
                    Desativar
                  </button>}</td>
                <td>

                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openRestaurantDetails(restaurante)}
                  ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openRestaurantDetails(restaurante)}
                  >
                    Alterar Senha
                  </button>
                  
                </td>
              </tr>
            ))}
            {restaurantList.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  Nenhum restaurante encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdmPage;
