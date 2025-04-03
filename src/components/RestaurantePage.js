import React, { useState, useEffect } from "react";
import AdmPage from "./AdmPage";
import './RestaurantePage.css'

function RestaurantePage(user) {
  const [abaList, setAbaList] = useState([]);
  const [nomeAba, setoNomeAba] = useState('')

  useEffect(() => {
      buscarCardapio();
    }, []);
  const openEditarAbaDetails = (restaurante) => {
    // if (restaurante.status != 1) {

    //   setSelectedRestaurant(restaurante);
    //   setNome(restaurante.nome);
    //   setEmail(restaurante.email);
    //   setModalType('editar');
    // } else {
    //   alert(`Ative o perfil ${restaurante.nome} para poder edita-lo.`)
    // }
  };
  const buscarCardapio = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${user.token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("/api/RestauranteAbaCardapio/listar-todos", requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setAbaList(data);
        console.log(data)
      })
      .catch((error) => console.error("Erro ao buscar restaurantes:", error));
  };
  return (
    <div>


      <div className="container">
        <h2>Bem-vindo</h2>
        <p>Nome: {user.user.nome}</p>
        <p>Email: {user.user.email}</p>
      </div>
      <div className="add">
        <h4 className="mt-4">Cardapio</h4>
        <button type="button" className="btn btn-sm btn-success" >+ Adicionar</button>
      </div>



      <div className="table-responsive">
        <table className="table table-bordered table-hover mt-3">
          <thead className="thead-dark">
            <tr>
              <th>Nome</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {abaList.map((aba) =>

              <tr key={aba.id}>
                <td>{aba.nome}</td>

                <td>
                  <button className="btn btn-sm btn-primary me-2" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                      className="bi bi-pencil-fill" viewBox="0 0 16 16">
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                  </button>
                  <button className="btn btn-sm btn-primary" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                    </svg>
                  </button>
                </td>
              </tr>
              
  
            )}
            {abaList.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">O cardápio está vazio.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>


  );
}

export default RestaurantePage;