import React from 'react';

// Props que recibe:
// - paginaActual: (1, 2, 3...)
// - totalPaginas: (Calculado por el backend)
// - onCambioPagina: Función para avisar al padre que cambie el estado
const Paginador = ({ paginaActual, totalPaginas, onCambioPagina }) => {

  // Si solo hay 1 página, no mostramos nada
  if (totalPaginas <= 1) return null;

  return (
    <nav className="d-flex justify-content-center mt-4">
      <ul className="pagination">
        
        {/* BOTÓN ANTERIOR */}
        <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => onCambioPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            Anterior
          </button>
        </li>

        {/* INFO DE PÁGINA (Estilo simple: "Página 1 de 5") */}
        <li className="page-item disabled">
            <span className="page-link text-dark">
                Página {paginaActual} de {totalPaginas}
            </span>
        </li>

        {/* BOTÓN SIGUIENTE */}
        <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => onCambioPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente
          </button>
        </li>
        
      </ul>
    </nav>
  );
};

export default Paginador;