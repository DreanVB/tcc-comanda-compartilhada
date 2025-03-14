import React, { useState, useEffect } from "react";
import AdmPage from "./AdmPage";

function RestauranteList(user) {
    console.log(user)
    console.log(user.token)
    console.log(user.user.id)
    const [Rest, setRest] = useState([]);

    //   // Função para capitalizar a primeira letra

    return (
        <div>
          {user.user.id == 1 && <AdmPage user={user} />}
        </div>
      
        // <div className="image-list-container">
        //     <strong>Bem-Vindo</strong>
        //     <div className="header-container">
        //         <div>
        //             Nome: {user.user.name}
        //             <br></br>
        //             Email: {user.user.email}
        //         </div>
        //         <div>
        //             Restaurantes Cadastrados

        //         </div>
        //     </div>

        //     <div className="image-list">
        //         <div

        //             className="card animate-card"
        //         // onClick
        //         >
        //             <img
        //                 alt={`Terreno em `}
        //                 className="card-image"
        //             />
        //             <div className="card-content">
        //                 <p>
        //                     <strong>Condição:</strong>
        //                 </p>
        //                 <p>
        //                     <strong>Coordenada:</strong>
        //                 </p>
        //                 <p>
        //                     <strong>Descrição do Terreno:</strong>
        //                 </p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}

export default RestauranteList;