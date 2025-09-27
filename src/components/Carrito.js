import React from 'react';

const Carrito = ({ carrito, ajustarCantidad }) => {
  const numeroCliente = "+5493517516783"; // Reemplaza con el número de WhatsApp del cliente
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const construirMensaje = () => {
    let mensaje = "¡Hola! Quisiera hacer un pedido:\n\n";
    carrito.forEach(item => {
      mensaje += `${item.cantidad} x ${item.nombre} ($${(item.precio * item.cantidad).toFixed(2)})\n`;
    });
    mensaje += `\nTotal: $${total.toFixed(2)}`;
    return encodeURIComponent(mensaje);
  };

  const enviarWhatsApp = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    const mensajeCodificado = construirMensaje();
    window.open(`https://wa.me/${numeroCliente}?text=${mensajeCodificado}`, '_blank');
  };

  return (
    <div className="carrito">
      <h2>Tu Pedido</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {carrito.map(item => (
            <li key={item.id}>
              <img src={item.url_imagen} alt={item.nombre} />
              <div>
                <h4>{item.nombre}</h4>
                <p>${item.precio.toFixed(2)}</p>
                <div>
                  <button onClick={() => ajustarCantidad(item.id, item.cantidad - 1)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => ajustarCantidad(item.id, item.cantidad + 1)}>+</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={enviarWhatsApp} disabled={carrito.length === 0}>
        Enviar Pedido por WhatsApp
      </button>
    </div>
  );
};

export default Carrito;
