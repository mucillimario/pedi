import React from 'react';

const Catalogo = ({ productos, agregarAlCarrito }) => {
  return (
    <div className="catalogo">
      {productos.map(producto => (
        <div key={producto.id} className="producto-card">
          <img src={producto.url_imagen} alt={producto.nombre} />
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>
          <p>${producto.precio.toFixed(2)}</p>
          <button onClick={() => agregarAlCarrito(producto)}>Añadir al Carrito</button>
        </div>
      ))}
    </div>
  );
};

export default Catalogo;
