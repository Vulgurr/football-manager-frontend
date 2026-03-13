import { Outlet } from 'react-router-dom';


function Layout() {
  return (
    <div className="layout-container">
      <main style={{ minHeight: '80vh', padding: '20px' }}>
        {/* 
            Sin el <Outlet />, las rutas hijas (Home, Login, etc.) 
            NUNCA se van a renderizar. Es como un placeholder.
        */}
        <Outlet />
      </main>

      {/*Footer  */}
      <footer style={{ textAlign: 'center', padding: '10px', background: '#f0f0f0' }}>
        <p>© 2026 Mi App de Fútbol</p>
      </footer>
    </div>
  );
}

export default Layout;