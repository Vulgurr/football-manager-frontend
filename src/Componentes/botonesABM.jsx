
import { Link } from "react-router-dom";
import { useAuth } from "../Context/authContext";

function ColocarBotones({ equipo, linkVer, onEliminar }) {
  const { user } = useAuth();
  const esAdmin = user?.rol === "admin";

  return (

    <div className="d-flex gap-2 align-items-center">
      

      <Link 
        to={`${linkVer}/${equipo.id}`} 
        state={{ equipo }}
        className="btn btn-info text-white rounded-pill px-4 shadow-sm fw-bold"
        style={{ transition: "all 0.2s ease-in-out" }} // Pequeña animación al pasar el mouse
      >
        Ver Detalles
      </Link>

      {esAdmin && (
        <button 
          type="button" 
          className="btn btn-danger rounded-pill px-4 shadow-sm fw-bold btn-rojo"
          onClick={() => onEliminar(equipo.id)}
          style={{ transition: "all 0.2s ease-in-out" }}
        >
          Eliminar
        </button>
      )}
      
    </div>
  );
}

export default ColocarBotones;