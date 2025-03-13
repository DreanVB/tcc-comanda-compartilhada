// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import "./PageInicial.css";

function PageInicial(user) {
  console.log(user)
  console.log(user.token)
  console.log(user.user.id)
  
    

 

  return (
    <div className="image-list-container">
      {
        <>
          <div className="header-container">
            <img
              
              alt="Ícone de Terreno"
              className="image-list-icon"
            />
            <div className="title-container">
              <h1 className="image-list-title">
                Terrenos Baldios Identificados
              </h1>
              <p className="image-list-subtitle">
                Aqui estão os terrenos baldios identificados pela nossa
                plataforma
              </p>
            </div>
          </div>

          <div className="image-list">
            {((image, index) => (
              <div
                key={index}
                className="card animate-card"
              >
                <img
                  src={image.imageUrl}
                  alt={`Terreno em ${image.location}`}
                  className="card-image"
                />
                <div className="card-content">
                  <h3>{image.location}</h3>
                  <p>
                    <strong>Condição:</strong> {image.soilCondition}
                  </p>
                  <p>
                    <strong>Coordenada:</strong> {image.coordinate}
                  </p>
                  <p>
                    <strong>Descrição do Terreno:</strong>{" "}
                    {image.landDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      }
    </div>
  );
}

export default PageInicial;
