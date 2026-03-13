import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/authContext";

function RutaProtegida() {
  const { user } = useAuth();

  // Si NO hay usuario, redirigimos al login.
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  // Si hay usuario, renderizamos las rutas hijas (el Outlet).
  return <Outlet />;
}

export default RutaProtegida;