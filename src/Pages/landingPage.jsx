import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-container" style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>⚽ Futbol Manager</h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>
        La mejor herramienta (que puedo diseñar) para gestionar tus equipos y torneos.
      </p>
      
      <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        {/* Usamos Link para navegar sin recargar */}
        <Link to="/auth/login">
          <button style={{ padding: '10px 20px', cursor: 'pointer' }}>Iniciar Sesión</button>
        </Link>
      </div>
      
      <img 
        src="https://cdn-icons-png.flaticon.com/512/53/53283.png" 
        alt="Pelota" 
        width="150" 
        style={{ marginTop: '50px', opacity: 0.8 }} 
      />
    </div>
  );
}

export default LandingPage;