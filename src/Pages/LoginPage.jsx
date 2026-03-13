import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { esMailValido, esPassValida } from "../utils/helpers.js";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { login } = useAuth();
  const navigate = useNavigate();


  const [formErrors, setFormErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));

    // Limpiar el error de ese campo cuando el usuario empiece a escribir de nuevo
    if (formErrors[id]) {
      setFormErrors((prev) => ({ ...prev, [id]: "" }));
    }
    setGeneralError("");
  };

  // Función dedicada a validar y devolver mensajes exactos
  const validateForm = () => {
    const errors = {};


    const emailError = esMailValido(formData.email);
    const passError = esPassValida(formData.password);

    // Si el helper nos devolvió algo (string), lo asignamos
    if (emailError) errors.email = emailError;
    if (passError) errors.password = passError;

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ejecutamos validación
    const errors = validateForm();

    // Si el objeto errors tiene alguna propiedad, detenemos el submit
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await login(formData);
      navigate("/equipos");
    } catch (error) {
      // Este es para errores del backend (ej: "Credenciales incorrectas")
      setGeneralError(error.message);
    }
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
              <form onSubmit={handleSubmit} noValidate> {/* Añadimos noValidate para apagar el tooltip por defecto del navegador */}

                {/* Error del Backend */}
                {generalError && (
                  <div className="alert alert-danger text-center p-2 mb-3">
                    {generalError}
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-muted small">Correo electrónico</label>
                  <input
                    // Bootstrap intercala el borde rojo si tiene la clase is-invalid
                    className={`form-control form-control-lg ${formErrors.email ? 'is-invalid' : ''}`}
                    id="email"
                    type="email"
                    placeholder="usuario@hotmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {/* Este div nativo de Bootstrap solo aparece cuando el input es is-invalid */}
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
                  <div className="invalid-feedback" style={{ whiteSpace: "pre-line" }}>
                    {formErrors.password}
                  </div>
                </div>

                <div className="d-grid gap-2 mt-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Iniciar Sesión
                  </button>
                  <Link to="/auth/registrarse" className="btn btn-outline-secondary">
                    Registrarse
                  </Link>
                </div>

              </form>
            </div>

            <div className="card-footer text-center py-3 bg-light border-0 rounded-bottom">
              <div className="small">
                <Link to="#" className="text-decoration-none">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;