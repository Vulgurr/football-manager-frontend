import { useNavigate } from "react-router-dom";
import DetalleEquipo from "../Componentes/DetalleEquipo";
import { postEquipo } from "../servicios/serviciosEquipo";
import AlertaVisual from "../Componentes/AlertaVisual";
import { useState } from "react";
function AgregarEquipo(){
    //No va a recibir un parámetro equipo porque literalmente se crea acá
    const navigate=useNavigate();
      const [alerta, setAlerta] = useState({
        visible: false,
        titulo: "",
        texto: "",
        onAceptar: "",
        tipo: ""
      })
    const manejarAgregar = async (dataToSend) => {
      console.log("Llamando a la API para agregar un equipo");  
       try{      
        await postEquipo(dataToSend);
                setAlerta({
          visible: true,
          titulo: "Modificación exitosa",
          texto: "Equipo modificado correctamente",
          tipo: "exito",
          onAceptar: () => navigate("/equipos")
        })
      }
      catch{
                setAlerta({
          visible: true,
          titulo: "Error agregando un equipo",
          texto: "Ocurrió un error intentando agregar un equipo. Intenta de nuevo más tarde",
          tipo: "error",
          onAceptar: () => navigate("/equipos")
        })
      }
    };
    
            return(
        <>
        <DetalleEquipo equipo={null} esEditable={true} 
        onGuardar={manejarAgregar} onCancelar={() => navigate("/equipos")}></DetalleEquipo>
            {alerta.visible && (<AlertaVisual 
          titulo={alerta.titulo}
          texto={alerta.texto}
          onAceptar={alerta.onAceptar}
          tipo={alerta.tipo}
        />)}
        </>
    )
}

export default AgregarEquipo;