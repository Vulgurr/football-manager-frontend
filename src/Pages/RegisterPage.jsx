import { useState } from "react";
import { registrarUsuario } from "../servicios/serviciosLogin";
import { useNavigate } from "react-router-dom";
import AlertaVisual from "../Componentes/AlertaVisual";
// Asegúrate de que la ruta de tus helpers sea la correcta
import { esNombreValido, esMailValido, esPassValida } from "../utils/helpers"; 

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [alerta, setAlerta] = useState({
    visible: false,
    titulo: "",
    texto: "",
    onAceptar: "",
    tipo: ""
  });

  // Estado para los errores individuales de cada input
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(""); // Este es para el alert rojo superior

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));

    // Limpiamos el error del campo específico cuando el usuario vuelve a escribir
    if (formErrors[id]) {
      setFormErrors((prev) => ({ ...prev, [id]: "" }));
    }
    setError(""); // Limpiamos el error general por las dudas
  };

  // Función dedicada a validar usando tus helpers centralizados
  const validateForm = () => {
    const errors = {};

    const nameError = esNombreValido(formData.name);
    const emailError = esMailValido(formData.email);
    const passError = esPassValida(formData.password);

    if (nameError) errors.name = nameError;
    if (emailError) errors.email = emailError;
    if (passError) errors.password = passError;

    return errors;
  };

  // Convertimos a async para poder esperar la respuesta de registrarUsuario
  const handleSubmit = async (e) => { 
    e.preventDefault();
    
    // 1. Ejecutamos las validaciones
    const errors = validateForm();

    // 2. Si hay errores (el objeto no está vacío), detenemos todo y los mostramos
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // 3. Si todo está perfecto, intentamos registrar
    try {
      await registrarUsuario(formData); // IMPORTANTE: Agregamos await
      
      setAlerta({
        visible: true,
        titulo: "Registro exitoso",
        texto: "¡Usuario registrado correctamente!",
        onAceptar: () => navigate("/auth/login"),
        tipo: "success" // Asumiendo que tu AlertaVisual acepta un tipo
      });
      
    } catch (err) { // Cambié la variable a 'err' para no pisar el estado 'error'
      setError(err.message);
      setAlerta({
        visible: true,
        titulo: "Error",
        texto: "Error registrando al usuario: " + err.message,
        onAceptar: () => cerrarAlerta(),
        tipo: "error"
      });
    }
  };

  const cerrarAlerta = () => {
    setAlerta({ ...alerta, visible: false });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">

          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-transparent border-0 text-center mt-3">
              <h3 className="font-weight-light">Bienvenido</h3>
            </div>

            <div className="card-body p-4">
              {/* Añadimos noValidate para desactivar validación nativa del navegador */}
              <form onSubmit={handleSubmit} noValidate> 

                {error && (
                  <div className="alert alert-danger text-center p-2 mb-3">
                    {error}
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-muted small">Nombre</label>
                  <input
                    className={`form-control form-control-lg ${formErrors.name ? 'is-invalid' : ''}`}
                    id="name"
                    type="text"
                    placeholder="Juan Perez"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback" style={{ whiteSpace: "pre-line" }}>
                    {formErrors.name}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-muted small">Correo electrónico</label>
                  <input
                    className={`form-control form-control-lg ${formErrors.email ? 'is-invalid' : ''}`}
                    id="email"
                    type="email"
                    placeholder="usuario@hotmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback" style={{ whiteSpace: "pre-line" }}>
                    {formErrors.email}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-muted small">Contraseña</label>
                  <input
                    className={`form-control form-control-lg ${formErrors.password ? 'is-invalid' : ''}`}
                    id="password"
                    type="password"
                    placeholder="******"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {/* El whiteSpace: pre-line es clave acá para que los saltos de línea de la password funcionen */}
                  <div className="invalid-feedback" style={{ whiteSpace: "pre-line" }}>
                    {formErrors.password}
                  </div>
                </div>

                <div className="d-grid gap-2 mt-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Registrarse
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
      
      {alerta.visible && (
        <AlertaVisual 
          titulo={alerta.titulo}
          texto={alerta.texto}
          onAceptar={alerta.onAceptar}
          tipo={alerta.tipo}
        />
      )}
    </div>
  );
};

export default RegisterPage;