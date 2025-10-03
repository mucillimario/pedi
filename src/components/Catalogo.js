import React from 'react';
import styled from 'styled-components';

const Catalogo = ({ productos, agregarAlCarrito }) => {
  return (
    <CatalogoWrapper>
      {productos.map(producto => (
        <ProductoCard key={producto.id}>
          <ImagenProducto src={producto.url_imagen} alt={producto.nombre} />
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>
          <p>${producto.precio.toFixed(2)}</p>
          <BotonAgregar onClick={() => agregarAlCarrito(producto)}>
            Añadir al Carrito
          </BotonAgregar>
        </ProductoCard>
      ))}
    </CatalogoWrapper>
  );
};

// Estilos dentro del mismo archivo
const CatalogoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const ProductoCard = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  width: 200px;
  text-align: center;
  border-radius: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }

  h2 {
  color:darkblue}
`;

const ImagenProducto = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const BotonAgregar = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 8px;

  &:hover {
    background-color: #45a049;
  }
`;

export default Catalogo;
