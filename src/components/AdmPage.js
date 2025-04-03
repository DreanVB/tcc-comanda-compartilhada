import React, { useState, useEffect } from "react";
import './AdmPage.css';

function AdmPage(user) {
  const [restaurantList, setRestaurantList] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    buscarRestaurantes();
  }, []);

  const buscarRestaurantes = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${user.token}`);

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
    } else {
      if (restaurante.id != 1) {
        const confirmed = window.confirm(`Você deseja desativar o restaurante: ${restaurante.nome}?`)
        if (confirmed) {
          handleInativar(restaurante.id);
        }
      } else {
        alert(`Você não pode desativar o perfil ${restaurante.nome}`)
      }
    }
  };

  const handleInativar = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user.user.token);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: "",
      redirect: "follow"
    };

    fetch(`api/Restaurante/${id}/inativar`, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao inativar");
        return response.text();
      })
      .then((result) => {
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

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: "",
      redirect: "follow"
    };

    fetch(`api/Restaurante/${id}/ativar`, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao ativar");
        return response.text();
      })
      .then((result) => {
        alert("Restaurante ativado com sucesso!");
        buscarRestaurantes();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao ativar restaurante.");
      });
  };

  const openEditarRestaurantDetails = (restaurante) => {
    if (restaurante.status != 1) {

      setSelectedRestaurant(restaurante);
      setNome(restaurante.nome);
      setEmail(restaurante.email);
      setModalType('editar');
    } else {
      alert(`Ative o perfil ${restaurante.nome} para poder edita-lo.`)
    }
  };

  const closeModal = () => {
    setSelectedRestaurant(null);
    setModalType(null)
  };

  const handleEditar = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${user.user.token}`);

    const body = JSON.stringify({
      nome: nome,
      email: email
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: body,
      redirect: "follow"
    };

    fetch(`/api/Restaurante/${selectedRestaurant.id}`, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao editar restaurante");
        return response.text();
      })
      .then((result) => {
        alert("Restaurante editado com sucesso!");
        closeModal();
        buscarRestaurantes();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao editar restaurante.");
      });
  };
  const openAlteraSenha = (restaurante) => {
    setSelectedRestaurant(restaurante);
    setSenha('');  // Limpa o campo da senha
    setModalType('senha');  // Exibe o modal
  };
  const handleAlterarSenha = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${user.user.token}`);

    const body = JSON.stringify({
      novaSenha: senha
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: body,
      redirect: "follow"
    };

    fetch(`/api/Restaurante/${selectedRestaurant.id}/alterar-senha`, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao alterar senha");
        return response.text();
      })
      .then((result) => {
        alert("Senha alterada com sucesso!");
        closeModal();
        buscarRestaurantes();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao alterar senha.");
      });
  };
  const openAdicionarRestaurante = () => {
    setNome('');
    setEmail('');
    setModalType('adicionar');
  }
  const handleAdicionar = (e) => {
    e.preventDefault();
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${user.token}`);
  
    const body = JSON.stringify({
      nome: nome,
      email: email,
      senha: senha
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
      redirect: "follow"
    };
  
    fetch("/api/Restaurante", requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao adicionar restaurante");
        return response.text();
      })
      .then(() => {
        alert("Restaurante adicionado com sucesso!");
        closeModal();
        buscarRestaurantes();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao adicionar restaurante.");
      });
  };




  return (
    <div className="container">
      <h2>Bem-vindo</h2>
      <p>Nome: {user.user.nome}</p>
      <p>Email: {user.user.email}</p>
      <div className="add">
        <h4 className="mt-4">Restaurantes Cadastrados</h4>
        <button type="button" className="btn btn-sm btn-success" onClick={openAdicionarRestaurante}>+ Adicionar</button>
      </div>


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
            {restaurantList.map((restaurante) =>
              restaurante.id !== 1 ? (
                <tr key={restaurante.id}>
                  <td>{restaurante.id}</td>
                  <td>{restaurante.nome}</td>
                  <td>{restaurante.email}</td>
                  <td>
                    {restaurante.status ? (
                      <button className="btn btn-sm btn-danger" onClick={() => desativaRestaurante(restaurante)}>
                        Inativo
                      </button>
                    ) : (
                      <button className="btn btn-sm btn-success" onClick={() => desativaRestaurante(restaurante)}>
                        Ativo
                      </button>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => openEditarRestaurantDetails(restaurante)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                      </svg>
                    </button>
                    <button className="btn btn-sm btn-primary" onClick={() => openAlteraSenha(restaurante)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ) : (<tr key={restaurante.id}>
                <td>{restaurante.id}</td>
                <td>{restaurante.nome}</td>
                <td>{restaurante.email}</td>
                <td></td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => openEditarRestaurantDetails(restaurante)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                      className="bi bi-pencil-fill" viewBox="0 0 16 16">
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                  </button>
                  <button className="btn btn-sm btn-primary" onClick={() => openAlteraSenha(restaurante)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                    </svg>
                  </button>
                </td>
              </tr>)
            )}

            {restaurantList.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">Nenhum restaurante encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalType == 'editar' && selectedRestaurant && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Editar Restaurante</h4>
            <form onSubmit={handleEditar}>
              <label>
                <i className="icon user-icon"></i>
                {selectedRestaurant.id !== 1 ? (
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                ) : (
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    disabled
                  />
                )}
              </label>
              <label>
                <i className="icon email-icon"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                <button type="submit" className="btn btn-lg btn-success">
                  Salvar
                </button>
                <button type="button" className="btn btn-lg btn-outline-danger" onClick={closeModal}>
                  Cancelar
                </button>
              </label>
            </form>
          </div>
        </div>
      )}
      {modalType === 'senha' && selectedRestaurant && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Alterar Senha</h4>
            <form onSubmit={handleAlterarSenha}>
              <label>
                <i className="icon senha-icon"></i>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  placeholder="Nova senha"
                />
              </label>
              <label>
                <button type="submit" className="btn btn-lg btn-success">Salvar</button>
                <button type="button" className="btn btn-lg btn-outline-danger" onClick={closeModal}>Cancelar</button>
              </label>
            </form>
          </div>
        </div>
      )}
      {modalType=='adicionar' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Adicionar Restaurante</h4>
            <form onSubmit={handleAdicionar}>
              <label>
                <i className="icon user-icon"></i>
                
                  <input
                    type="text"
                    placeholder="Nome"                    
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                
              </label>
              <label>
                <i className="icon email-icon"></i>
                <input
                  type="email"
                  placeholder="E-mail"        
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                <i className="icon senha-icon"></i>
                <input
                  type="password"
                  placeholder="Senha"        
                  onChange={(e) => setSenha(e.target.value)}
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
    </div>
  );
}

export default AdmPage;
