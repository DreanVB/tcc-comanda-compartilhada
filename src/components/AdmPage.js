import React, { useState, useEffect } from "react";
import './AdmPage.css';

function AdmPage(user) {
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
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
  }, []);

  const openRestaurantDetails = (restaurante) => {
    alert(`Você clicou no restaurante: ${restaurante.nome}`);
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
              <th>Nome</th>
              <th>Email</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {restaurantList.map((restaurante) => (
              <tr key={restaurante.id}>
                <td>{restaurante.nome}</td>
                <td>{restaurante.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openRestaurantDetails(restaurante)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openRestaurantDetails(restaurante)}
                  >
                    Alterar Senha
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openRestaurantDetails(restaurante)}
                  >
                    Desativar
                  </button>
                </td>
              </tr>
            ))}
            {restaurantList.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
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
