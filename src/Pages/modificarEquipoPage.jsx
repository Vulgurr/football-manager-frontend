import { useNavigate, useParams } from "react-router-dom";
import DetalleEquipo from "../Componentes/DetalleEquipo";
import { patchEquipo, obtenerEquipoPorID } from "../servicios/serviciosEquipo";
import { useEffect, useState } from "react";
import AlertaVisual from "../Componentes/AlertaVisual";
function ModificarEquipo() {
  /*Si bien el equipo se debería poder recibir por parámetro. opto por la resolución 
  de preguntar siempre a la API para tener la "verdad" en todo momento*/
  const navigate = useNavigate();
  const { id } = useParams();
  const [equipo, setEquipo] = useState(null);
  const [alerta, setAlerta] = useState({
    visible: false,
    titulo: "",
    texto: "",
    onAceptar: "",
    tipo: ""
  })
  useEffect(() => {
    const obtenerEquipo = async () => {
      try {
        const equipoBuscado = await obtenerEquipoPorID(id);
        setEquipo(equipoBuscado);
        setAlerta({
          visible: true,
          titulo: "Modificación exitosa",
          texto: "Equipo modificado correctamente",
          tipo: "exito",
          onAceptar: () => navigate("/equipos/ver/" + equipo.id)
        })
      } catch {
        console.error("No se encontro el equipo para editar");
        setAlerta({
          visible: true,
          titulo: "Error en la modificación",
          texto: "El equipo que se intenta modificar no existe o no tenés los permisos necesarios",
          tipo: "error",
          onAceptar: () => navigate("/")
        })
      }
    }
    obtenerEquipo();

  }, [id, equipo.id,navigate]);
  const manejarModificar = async (dataToSend) => {
    //Le pongo DataToSend para que se entienda que recibimos datos,
    //si pongo "e" da a entender que es un evento
    console.log("Llamando a la API para modificar un equipo");
    try {
      await patchEquipo(dataToSend);
      navigate(`/equipos/ver/${equipo.id}`);
    }
    catch {
      console.error("Error modificando un equipo");
    }
  };
  if (!equipo) return (<p>Esperando los datos del equipo...</p>)
  return (
    <>
      <DetalleEquipo equipo={equipo} esEditable={true}
        onGuardar={manejarModificar} onCancelar={() => navigate("/equipos/ver/" + equipo.id)}></DetalleEquipo>
      {alerta.visible && (<AlertaVisual
        titulo={alerta.titulo}
        texto={alerta.texto}
        onAceptar={alerta.onAceptar}
        tipo={alerta.tipo}
      />)}
    </>
  )
}

export default ModificarEquipo;