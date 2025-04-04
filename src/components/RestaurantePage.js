import React, { useState, useEffect } from "react";
import AdmPage from "./AdmPage";
import './RestaurantePage.css'

function RestaurantePage(user) {
  const [abaList, setAbaList] = useState([]);
  const [nomeAba, setNomeAba] = useState('')
  const [modalType, setModalType] = useState(null);
  const [selectedAba, setSelectedAba] = useState(null)

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
  const closeModal = () => {
    // setSelectedRestaurant(null);
    setModalType(null)
  };
  const openAdicionarAba = () => {
    setNomeAba('')
    setModalType('adicionarAba');
  }
  const handleAdicionarAba = (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${user.token}`);

    const body = JSON.stringify({
      nome: nomeAba,

    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
      redirect: "follow"
    };

    fetch("/api/RestauranteAbaCardapio", requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao adicionar Categoria");
        return response.text();
      })
      .then(() => {
        setModalType('confirmaAba');
        buscarCardapio();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao adicionar Categoria.");
      });
  }
  const openEditarAba = (aba) => {
    setSelectedAba(aba);
    setNomeAba(aba.nome)
    setModalType('editaAba');
  }
  const handleEditaAba = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${user.token}`);

    const body = JSON.stringify({
      nome: nomeAba
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: body,
      redirect: "follow"
    };

    fetch(`/api/RestauranteAbaCardapio/${selectedAba.id}`, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao editar restaurante");
        return response.text();
      })
      .then((result) => {
        setModalType('confirmaEditaAba');
        buscarCardapio();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao editar aba.");
      });


  }
  const openRemoveAba = (aba) => {
    setSelectedAba(aba);
    setModalType('removeAba');
  }
  const handleApagarAba = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${user.token}`);

    const body = JSON.stringify({
      nome: nomeAba
    });

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: body,
      redirect: "follow"
    };

    fetch(`/api/RestauranteAbaCardapio/${selectedAba.id}`, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao editar restaurante");
        return response.text();
      })
      .then((result) => {
        setModalType('confirmaApagarAba');
        buscarCardapio();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao apagar aba.");
      });


  }

  return (
    <div>


      <div className="container">
        <h2>Bem-vindo</h2>
        <p>Nome: {user.user.nome}</p>
        <p>Email: {user.user.email}</p>
      </div>
      <div className="add">
        <h4 className="mt-4">Cardapio</h4>
      </div>
      <div className="tela">

        <div className="panel-container">
          <div className={`panel-rest`}>
            <div className="table-responsive">
              <table className="table table-bordered table-hover mt-3">
                <thead className="thead-dark">
                  <button type="button" className="btn btn-sm btn-success" onClick={openAdicionarAba} >+ Adicionar</button>

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
                        <button className="btn btn-sm btn-primary me-2" onClick={() => openEditarAba(aba)} >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            className="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                          </svg>
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => openRemoveAba(aba)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
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
        </div>
        <div className="auth-form-container">
          <div className={`panel-rest`}>
            <button type="button" className="btn btn-sm btn-success" >+ Adicionar</button>
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
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
        </div>

      </div>
      {modalType == 'adicionarAba' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Adicionar Categoria</h4>
            <form onSubmit={handleAdicionarAba}>
              <label>
                <i className="icon user-icon"></i>

                <input
                  type="text"
                  placeholder="Categoria"
                  value={nomeAba}
                  onChange={(e) => setNomeAba(e.target.value)}
                  required
                />

              </label>
              <label>
                <button type="submit" className="btn btn-lg btn-success">
                  Adicionar
                </button>
                <button type="button" className="btn btn-lg btn-outline-danger" onClick={closeModal}>
                  Cancelar
                </button>
              </label>
            </form>
          </div>
        </div>
      )}
      {modalType == 'confirmaAba' && (
        <div className="modal-overlay">
          <div className="modal-content">
            Categoria adicionada com sucesso!
            <button type="button" className="btn btn-sm btn-outline-danger" onClick={closeModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
      {modalType == 'editaAba' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Adicionar Categoria</h4>
            <form onSubmit={handleEditaAba}>
              <label>
                <i className="icon user-icon"></i>

                <input
                  type="text"
                  placeholder="Categoria"
                  value={nomeAba}
                  onChange={(e) => setNomeAba(e.target.value)}
                  required
                />

              </label>
              <label>
                <button type="submit" className="btn btn-lg btn-success">
                  Confirmar
                </button>
                <button type="button" className="btn btn-lg btn-outline-danger" onClick={closeModal}>
                  Cancelar
                </button>
              </label>
            </form>
          </div>
        </div>
      )}
      {modalType == 'confirmaEditaAba' && (
        <div className="modal-overlay">
          <div className="modal-content">
            Categoria editada com sucesso!
            <button type="button" className="btn btn-sm btn-outline-danger" onClick={closeModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
      {modalType == 'removeAba' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Você tem certeza que deseja apagar esta categoria? 
              Ao apagar a categoria todos o itens também serão apagados.</h4>
              <label>
                <button type="submit" className="btn btn-lg btn-danger"onClick={handleApagarAba}>
                  Apagar
                </button>
                <button type="button" className="btn btn-lg btn-outline-success" onClick={closeModal}>
                  Cancelar
                </button>
              </label>
              
          </div>
        </div>
      )}{modalType == 'confirmaApagarAba' && (
        <div className="modal-overlay">
          <div className="modal-content">
            Categoria foi apagada com sucesso!
            <button type="button" className="btn btn-sm btn-outline-danger" onClick={closeModal}>
              Fechar
            </button>
          </div>
        </div>
      )}


    </div>


  );
}

export default RestaurantePage;