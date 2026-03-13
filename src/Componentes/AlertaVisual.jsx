import './AlertaVisual.css'; // Importamos los estilos
/*Esta alerta oscurece la pantalla y te tira un aviso.
El aviso tiene un titulo, un texto, un evento de aceptar y un tipo */
const AlertaVisual = ({ titulo, texto, onAceptar, tipo }) => {
  return (
    <div className="alerta-overlay">
      <div className="alerta-contenedor">
        {/* Prop: Título Principal */}
        <h2 style={{ marginBottom: '10px', color: '#333' }}>
            {titulo}
        </h2>

        {/* Prop: Texto del cuerpo */}
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
            {texto}
        </p>

        {/* Prop: Botón con acción onClick */}
        <button className="btn-aceptar" onClick={onAceptar}>
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default AlertaVisual;