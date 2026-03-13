import { useState } from "react"
export function Buscador({onBuscar, onCancelar}){
    const [busqueda, setBusqueda] = useState("");
    const manejarBusqueda = (e) =>{
        setBusqueda(e.target.value);
    }

    const manejarCancelar = () => {
        setBusqueda(""); // Limpiamos el input visualmente
        onCancelar();    // Avisamos al padre
    };
    return (
    <div className="container">
      {/* BARRA DE BÚSQUEDA */}
      <div className="input-group mb-3 mt-3">
        <input 
            type="text" 
            className="form-control" 
            placeholder="Buscar equipo..." 
            value={busqueda}
            onChange={manejarBusqueda}
            // Truco: Buscar al presionar Enter
            onKeyDown={(e) => e.key === 'Enter' && onBuscar(busqueda)}
        />
        <button className="btn btn-primary" onClick={() =>onBuscar(busqueda)}>
            Buscar
        </button>
        <button className="btn btn-secondary" onClick={manejarCancelar}>
            Volver
        </button>
      </div>
    </div>
    )
}
export default Buscador;