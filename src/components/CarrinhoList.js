// import React, { useState, useEffect } from "react";
// import "./ImageList.css";

// function CarrinhoList() {
//   const [images, setImages] = useState([]);
//   const [selectedItens, setSelectedItens] = useState(null);

//   // Função para capitalizar a primeira letra
//   const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   useEffect(() => {
//     const title = document.querySelector(".image-list-title");
//     const subtitle = document.querySelector(".image-list-subtitle");
//     const icon = document.querySelector(".image-list-icon");

//     if (!selectedLandPlot) {
//       icon.classList.remove("animate");
//       title.classList.remove("animate");
//       subtitle.classList.remove("animate");

//       void icon.offsetWidth;

//       icon.classList.add("animate");
//       title.classList.add("animate");
//       subtitle.classList.add("animate");
//     }
//   }, [selectedLandPlot]);

//   const openItensDetails = (landPlot) => {
//     setSelectedLandPlot(landPlot);
//   };

//   const closeLandPlotDetails = () => {
//     setSelectedLandPlot(null);
//   };

//   return (
//     <div className="image-list-container">
//       {selectedLandPlot ? (
//         <ItensDetails
//           landPlot={selectedLandPlot}
//           onBack={closeLandPlotDetails}
//         />
//       ) : (
//         <>
//           <div className="header-container">
//             <img
//               src={itemIcon}
//               alt="Ícone de Terreno"
//               className="image-list-icon"
//             />
//             <div className="title-container">
//               <h1 className="image-list-title">
//                 Itens no carrinho
//               </h1>
//               <p className="image-list-subtitle">
//                 {/* Aqui estão os terrenos baldios identificados pela nossa
//                 plataforma */}
//               </p>
//             </div>
//           </div>

//           <div className="image-list">
//             {images.map((image, index) => (
//               <div
//                 key={index}
//                 className="card animate-card"
//                 onClick={() => openItensDetails(image)}
//               >
//                 <img
//                   src={image.imageUrl}
//                   alt={`Terreno em ${image.location}`}
//                   className="card-image"
//                 />
//                 <div className="card-content">
//                   <h3>{image.location}</h3>
//                   <p>
//                     <strong>Condição:</strong> {image.soilCondition}
//                   </p>
//                   <p>
//                     <strong>Coordenada:</strong> {image.coordinate}
//                   </p>
//                   <p>
//                     <strong>Descrição do Terreno:</strong>{" "}
//                     {image.landDescription}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default CarrinhoList;