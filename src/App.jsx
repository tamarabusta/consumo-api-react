import { useState, useEffect } from 'react';

function App() {
  const argentinaUsers = [
    { id: 1, name: "María Gómez", email: "maria.gomez@gmail.com", address: { city: "Buenos Aires" } },
    { id: 2, name: "Juan Pérez", email: "juanperez@yahoo.com.ar", address: { city: "Córdoba" } },
    { id: 3, name: "Lucía Fernández", email: "lucia.fernandez@hotmail.com", address: { city: "Rosario" } },
    { id: 4, name: "Martín Rodríguez", email: "martin.rodriguez@outlook.com", address: { city: "Mendoza" } },
    { id: 5, name: "Sofía López", email: "sofia.lopez@gmail.com", address: { city: "La Plata" } },
    { id: 6, name: "Carlos Díaz", email: "carlos.diaz@gmail.com", address: { city: "San Miguel de Tucumán" } },
    { id: 7, name: "Valentina Morales", email: "valentina.morales@yahoo.com", address: { city: "Mar del Plata" } },
    { id: 8, name: "Federico Alvarez", email: "federico.alvarez@hotmail.com", address: { city: "Salta" } },
    { id: 9, name: "Camila Herrera", email: "camila.herrera@gmail.com", address: { city: "Santa Fe" } },
    { id: 10, name: "Agustín Romero", email: "agustin.romero@yahoo.com", address: { city: "Bahía Blanca" } },
    { id: 11, name: "Florencia Sosa", email: "florencia.sosa@hotmail.com", address: { city: "Neuquén" } },
    { id: 12, name: "Bruno Castro", email: "bruno.castro@gmail.com", address: { city: "Posadas" } },
    { id: 13, name: "Julieta Méndez", email: "julieta.mendez@gmail.com", address: { city: "San Juan" } },
  ];

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const sortedUsers = argentinaUsers.sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sortedUsers);
    setFilteredUsers(sortedUsers);
    setLoading(false);

    // Spinner animation keyframes
    const styleSheet = document.styleSheets[0];
    const keyframes =
      `@keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }`;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(value) ||
      user.address.city.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  if (loading) {
    return (
      <div style={{
        textAlign: 'center',
        marginTop: '100px',
      }}>
        <div style={{
          display: 'inline-block',
          width: '60px',
          height: '60px',
          border: '8px solid #f3f3f3',
          borderTop: '8px solid #4CAF50',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }} />
        <p style={{ fontSize: '20px', marginTop: '20px' }}>Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
        Lista de Usuarios Argentinos 🇦🇷
      </h1>

      {/* Buscador */}
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre o ciudad..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />
      </div>

      {/* Tabla */}
      <table style={{
        width: '80%',
        margin: '0 auto',
        borderCollapse: 'collapse',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.2)'
      }}>
        <thead>
          <tr>
            <th style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '12px',
              border: '1px solid #ddd',
              textAlign: 'left'
            }}>Nombre</th>
            <th style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '12px',
              border: '1px solid #ddd',
              textAlign: 'left'
            }}>Email</th>
            <th style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '12px',
              border: '1px solid #ddd',
              textAlign: 'left'
            }}>Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user.id}>
                <td style={{
                  border: '1px solid #ddd',
                  padding: '12px',
                  backgroundColor: '#f9f9f9',
                  color: '#333'
                }}>{user.name}</td>
                <td style={{
                  border: '1px solid #ddd',
                  padding: '12px',
                  backgroundColor: '#f9f9f9',
                  color: '#333'
                }}>{user.email}</td>
                <td style={{
                  border: '1px solid #ddd',
                  padding: '12px',
                  backgroundColor: '#f9f9f9',
                  color: '#333'
                }}>{user.address.city}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{
                textAlign: 'center',
                padding: '20px',
                color: '#777'
              }}>
                No se encontraron usuarios.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
