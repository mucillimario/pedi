import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';
import Catalogo from './components/Catalogo';
import Carrito from './components/Carrito';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [vista, setVista] = useState('catalogo');
  
  // Reemplaza con la URL de tu hoja de Google Sheets publicada como CSV
  const urlCatalogo = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSCG-a7ZEagq0DEGgM-MJvF0Jc51pqT6ZBiTHa8MAX25KmNQ7zV6MSbWCyDmxvqv-0PpXVw4RKnzysE/pub?gid=0&single=true&output=csv";

  useEffect(() => {
    Papa.parse(urlCatalogo, {
      download: true,
      header: true,
      complete: (results) => {
        setProductos(results.data.map(producto => ({
          ...producto,
          precio: parseFloat(producto.precio)
        })));
      }
    });
  }, [urlCatalogo]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const existe = prevCarrito.find(item => item.id === producto.id);
      if (existe) {
        return prevCarrito.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const ajustarCantidad = (id, cantidad) => {
    setCarrito(prevCarrito => {
      if (cantidad <= 0) {
        return prevCarrito.filter(item => item.id !== id);
      }
      return prevCarrito.map(item =>
        item.id === id ? { ...item, cantidad: cantidad } : item
      );
    });
  };

  return (
    <div className="App">
      <header>
        <h1>La tiendita</h1>
        <button onClick={() => setVista('catalogo')}>Mostrar Catálogo</button>
        <button onClick={() => setVista('carrito')}>
          🛒Carrito  ({carrito.reduce((acc, item) => acc + item.cantidad, 0)})
        </button>
      </header>
      <main>
        {vista === 'catalogo' ? (
          <Catalogo productos={productos} agregarAlCarrito={agregarAlCarrito} />
        ) : (
          <Carrito carrito={carrito} ajustarCantidad={ajustarCantidad} />
        )}
      </main>
    </div>
  );
}

export default App;
