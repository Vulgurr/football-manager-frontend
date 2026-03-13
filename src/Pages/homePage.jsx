import { useNavigate } from 'react-router-dom';
import { deleteEquipo } from "../servicios/serviciosEquipo";
import "../Componentes/tablaEquipos.css"
import TablaEquipos from '../Componentes/tablaEquipos';
import { useState, useEffect } from 'react';
import { obtenerEquipos } from '../servicios/serviciosEquipo';
import { useAuth } from '../Context/authContext';
import Buscador from '../Componentes/Buscador';

function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [equipos, setEquipos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [terminoBusqueda, setTerminoBusqueda] = useState(null); // null o "" string vacío
  const LIMITE_POR_PAGINA = 5; // O puedes poner 10, lo que quieras


  const manejarCambioPagina = (nuevaPagina) => {
    // Validaciones extra por seguridad
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPagina(nuevaPagina);
      // Al cambiar 'pagina', el useEffect se dispara solo y busca los datos nuevos
    }
  };

  useEffect(() => {
    //!NO se pueden pasar promesas en un useEffect    
    // Para sortear esta regla, definimos una funcion sincrona con una funcion asincrona adentro
    const cargarDatos = async () => {
      try {
        const data = await obtenerEquipos(pagina, LIMITE_POR_PAGINA, terminoBusqueda);
        //La busqueda incluye la pagina en la que estas y si agregas algun término a la busqueda,
        //ese termino puede ser null o un término
        setEquipos(data.equipo);

        setTotalPaginas(data.totalPaginas);

      } catch (error) {
        console.error("Error fetching equipos:", error);
      }
    };
    // La ejecutamos inmediatamente
    cargarDatos();
  }, [pagina, terminoBusqueda]);
  const eliminarLocal = (id) => {
    setEquipos(equiposPrev => {
      return equiposPrev.filter(eq => eq.id !== id)
    })
    //La forma mas eficiente de sacarlo siendo que es inmutable es devolver
    //un nuevo array con un filter de especificamente ese elemento
  }

  const manejarEliminar = async (id) => {
    try {
      await deleteEquipo(id);
      eliminarLocal(id);

    } catch (error) {
      //Si falla el servidor, no lo borramos de la pantalla y avisamos
      console.error("No se pudo borrar:", error);
    }
  }

  const irAAgregar = () => {
    navigate(`/equipos/agregar`);
  }

  const cerrarSesion = () => {
    logout();
    ////navigate("/");
    /*Aca hay dos opciones: Si hago el logout, mi rutaProtegida va a detectar que estamos en /equipos sin
    permiso y va a cambiar la ruta a /auth/login antes que el navigate se ejecute. Realmente por el
    re-rendereo no hace falta el ultimo navigate, pero si quisieras forzar al usuario a volver a home
    deberias poner primero el navigate y después el logout.  */
  }

  const ejecutarBusqueda = async (queryABuscar) => {
    setTerminoBusqueda(queryABuscar);
    setPagina(1);
  }

  const manejarCancelar = () => {
    setTerminoBusqueda(null);
    setPagina(1);
  }

  return (
    <>
      <h2>Bienvenido {user.name}</h2>
      <Buscador onBuscar={ejecutarBusqueda} onCancelar={manejarCancelar} />
      <TablaEquipos equipos={equipos} linkVer={`/equipos/ver`} onEliminar={manejarEliminar}
        onAgregar={irAAgregar} onCambioPagina={manejarCambioPagina} paginaActual={pagina}
        totalPaginas={totalPaginas}></TablaEquipos>
      <button
        onClick={cerrarSesion}
        className="btn btn-outline-secondary rounded-pill px-4 shadow-sm fw-bold"
        style={{ transition: "all 0.2s ease-in-out" }}
      >
        Cerrar sesión
      </button>
    </>
  )
}
export default HomePage;