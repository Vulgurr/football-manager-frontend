import { useLocation, useNavigate, useParams } from "react-router-dom";
import DetalleEquipo from "../Componentes/DetalleEquipo";
import {obtenerEquipoPorID} from "../servicios/serviciosEquipo";
import { useEffect, useState } from "react";
function VerEquipo(){
    const navigate=useNavigate();
    const { id }= useParams();
    const location=useLocation();
    const [equipo, setEquipo]=useState(location.state?.equipo || null);
    useEffect(() => {
      const obtenerEquipo = async() =>{
        try{
          const equipoBuscado=await obtenerEquipoPorID(id);
          setEquipo(equipoBuscado);
        }catch{
          console.error("No se encontro el equipo para editar");
                navigate("/"); // Si falla, volvemos al home
        }
      }
      if(!equipo)
        obtenerEquipo();

    }, [id, navigate, equipo]);
    if(!equipo) return (<p>Esperando los datos del equipo...</p>)
    return(
        <DetalleEquipo equipo={equipo} esEditable={false} 
        onGuardar={() =>{}} onCancelar={() => navigate("/equipos")}></DetalleEquipo>
    )
}

export default VerEquipo;