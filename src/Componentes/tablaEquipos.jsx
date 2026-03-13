import FilaEquipo from "./filaEquipo";
import Paginador from "./Paginador";
import './tablaEquipos.css';
//Literalmente importa un css  


function TablaEquipos({ equipos, linkVer, onEliminar, onAgregar, onCambioPagina, paginaActual, totalPaginas }) {
  return (
    <>
      {(!equipos || equipos.length === 0
        ?
        <p>No hay equipos cargados todavía.</p>
        :
        <div className="contenedor-lista">
          <table className="tabla">
            <thead>
              <tr>
                <th>Nombre del equipo</th>
                <th>Pais</th>
                <th>Escudo</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody id="tablaEquipos">
              {equipos.map((e) => (
                <tr key={e.id}>
                  <FilaEquipo equipo={e} linkVer={linkVer} onEliminar={onEliminar}></FilaEquipo>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      )}
      <button
        type="button"
        className="btn btn-success rounded-pill px-4 py-2 shadow-sm fw-bold botonAgregar"
        onClick={onAgregar}
        style={{ transition: "all 0.2s ease-in-out" }}
      >
        <span className="fs-5 me-1">+</span> Agregar un equipo a la lista
      </button>
      <Paginador paginaActual={paginaActual} totalPaginas={totalPaginas} onCambioPagina={onCambioPagina} />
    </>
  )
}
export default TablaEquipos;