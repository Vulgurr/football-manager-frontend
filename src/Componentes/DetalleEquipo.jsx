import { useState, useEffect } from "react";
import "./vistaEquipo.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Context/authContext";

function DetalleEquipo({ equipo, esEditable = false, onGuardar, onCancelar }) {
  const { user } = useAuth();

  const navigate = useNavigate();
  const puedeEditar= user?.rol === "admin" || user?.id == equipo?.creadoPor;
  const equipoInicial = equipo || {
    id: null,
    name: "", shortName: "", tla: "", crestUrl: "",
    address: "", phone: "", website: "", email: "",
    founded: "", clubColors: "", venue: "",
    lastUpdated: new Date(),
    area: { id: null, name: "" }
  };
  //Como este detalle sirve tanto para modear un equipo como para crear uno, necesitamos
  //este equipo auxiliar. Si equipo tiene un valor, va equipo, sino creo uno vacio
  
  const [formData, setFormData] = useState({
    id: equipoInicial.id,
    name: equipoInicial.name || "",
    shortName: equipoInicial.shortName || "",
    tla: equipoInicial.tla || "",
    crestUrl: equipoInicial.crestUrl || "",
    address: equipoInicial.address || "",
    phone: equipoInicial.phone || "",
    website: equipoInicial.website || "",
    email: equipoInicial.email || "",
    founded: equipoInicial.founded || "",
    clubColors: equipoInicial.clubColors || "",
    venue: equipoInicial.venue || "",
    lastUpdated: equipoInicial.lastUpdated,
    area: {
      id: equipoInicial.area?.id,
      name: equipoInicial.area?.name || ""
    }
  });
  //!Mas abajo explico sobre formData

  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);


  // Efecto para preview de imagen (sin haberla subido todavia al servidor)
  useEffect(() => {
    if (!archivoSeleccionado) {
      //Si no se seleccionó un archivo y se tocó cancelar o se salió, lo seteamos
      //en null para no subir nada. Es por seguridad
      // eslint-disable-next-line
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(archivoSeleccionado);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [archivoSeleccionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAreaChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      area: { ...prev.area, name: e.target.value }
    }));
  };

  const handleFileChange = (e) => {
    /* e.target.files es una propiedad que tiene un array de archivos.
    Primero preguntamos si existe y después si existe en su posición 0 (ya que para
    este formulario solo podemos subir una imagen por equipo), si existe que nos lo devuelva.
    El e.target.files se pregunta por compatibilidad con navegadores viejos y porque algo que puede
    pasar es:
    usuario selecciona "subir archivo" y cancela
    se crea e.target.files pero como no tiene nada es array vacio */
    if (e.target.files && e.target.files[0]) {
      setArchivoSeleccionado(e.target.files[0]);
    }
  };


  const irAModificar = () => {
    // Simplemente navegamos a la ruta de edición con el ID
    navigate(`/equipos/modificar/${formData.id}`);
  };

  const handleSubmit = (e) => {
    //El evento de submit, el más importante.
    e.preventDefault();

    const dataToSend = new FormData();
    /*
    Tenemos que usar un formData ya que no estamos pasando solamente texto sino que tenemos
    que pasar imágenes y objetos anidados, con json puro se puede hacer mediante codificar
    y decodificar en base64, pero es ineficiente.*/
    if (formData.id) {
        dataToSend.append("id", formData.id);
    }
    //el formData que definimos arriba 
    dataToSend.append("name", formData.name);
    dataToSend.append("shortName", formData.shortName);
    dataToSend.append("tla", formData.tla);
    dataToSend.append("address", formData.address);
    dataToSend.append("phone", formData.phone);
    dataToSend.append("website", formData.website);
    dataToSend.append("email", formData.email);
    dataToSend.append("founded", formData.founded);
    dataToSend.append("venue", formData.venue);
    dataToSend.append("area", JSON.stringify(formData.area));

    if (archivoSeleccionado) {
      dataToSend.append("image", archivoSeleccionado);
    }

    onGuardar(dataToSend);
  };

  return (
    <div className="detalle-card">
      <div className="detalle-header">
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="escudo-grande" />
        ) : (
          formData.crestUrl && <img src={formData.crestUrl} alt="Escudo" className="escudo-grande" />
        )}
        {/* Usamos esEditable */}
        <h2>{esEditable ? (formData.id ? "Editar Equipo" : "Nuevo Equipo") : formData.name}</h2>
      </div>

      <form onSubmit={handleSubmit} className="formulario-grid">

        <div className="campo">
          <label>Nombre Completo</label>
          <input name="name" value={formData.name} onChange={handleChange} disabled={!esEditable} />
        </div>

        <div className="campo">
          <label>Nombre Corto</label>
          <input name="shortName" value={formData.shortName} onChange={handleChange} disabled={!esEditable} />
        </div>

        <div className="campo chico">
          <label>TLA</label>
          <input name="tla" value={formData.tla} onChange={handleChange} disabled={!esEditable} maxLength={3} />
        </div>

        <div className="campo">
          <label>Año Fundación</label>
          <input type="number" name="founded" value={formData.founded} onChange={handleChange} disabled={!esEditable} />
        </div>

        <div className="campo">
          <label>País (Área)</label>
          <input name="areaName" value={formData.area.name} onChange={handleAreaChange} disabled={!esEditable} />
        </div>

        <div className="campo amplio">
          <label>Dirección</label>
          <input name="address" value={formData.address} onChange={handleChange} disabled={!esEditable} />
        </div>

        <div className="campo">
          <label>Estadio</label>
          <input name="venue" value={formData.venue} onChange={handleChange} disabled={!esEditable} />
        </div>

        <div className="campo">
          <label>Web</label>
          <input type="url" name="website" value={formData.website} onChange={handleChange} disabled={!esEditable} />
        </div>

        <div className="campo">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!esEditable} />
        </div>

        <div className="campo">
          <label>Teléfono</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={!esEditable} />
        </div>

        <div className="campo amplio">
          <label>Escudo del Club</label>
          {esEditable ? (
            <input
              key="input-archivo"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="input-file"
            />
          ) : (
            <input
              key="input-texto"
              type="text"
              value={formData.crestUrl || "Sin escudo"}
              disabled
              className="input-view-only"
            />
          )}
        </div>

        <div className="campo sistema">
          <label>ID:</label> <span>{formData.id}</span>
        </div>
        <div className="campo sistema">
          <label>Actualizado:</label> <span>{new Date(formData.lastUpdated).toLocaleDateString()}</span>
        </div>

        {(esEditable) && (
          <div className="acciones-form">
            <button type="submit" className="btn-guardar">Guardar Cambios</button>
          </div>
        )}
        {(!esEditable && puedeEditar) && (
          <div className="editar-equipo">
            <button type="button" onClick={irAModificar} className="btn-modificar">Modificar equipo</button>
          </div>
        )}
        <button type="button" onClick={onCancelar} className="btn-cancelar">Cancelar</button>

      </form>
    </div>
  );
}

export default DetalleEquipo;