
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import VerEquipo from './Pages/verEquipoPage';
import LandingPage from './Pages/landingPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import HomePage from './Pages/homePage';
import ModificarEquipo from './Pages/modificarEquipoPage';
import AgregarEquipo from './Pages/agregarEquipoPage';
import Layout from './Componentes/Layout';
import RutaProtegida from './Componentes/rutaProtegidaEquipo';


import { AuthProvider } from './Context/authContext';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/*El Layout Principal */}
          <Route path="/" element={<Layout />}>

            {/* Ruta base (Home) */}
            <Route index element={<LandingPage />} />


            <Route path="auth">
              <Route path="login" element={<LoginPage />} />
              <Route path="registrarse" element={<RegisterPage />} />
              {/*Aca poner /login es un error  porque react lo interpreta como que es la raiz */}
            </Route>
            <Route element={<RutaProtegida />}>
              <Route path="equipos">
                <Route index element={<HomePage />} />
                <Route path="ver/:id" element={<VerEquipo />} />
                <Route path="modificar/:id" element={<ModificarEquipo />} />
                <Route path="agregar" element={<AgregarEquipo />} />
              </Route>
            </Route>
            {/* Ruta 404 por si escriben cualquier cosa */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;