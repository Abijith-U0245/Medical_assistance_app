import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginAdmin from './pages/Login/LoginAdmin'; // Adjust path if needed
import RoleSelect from './pages/Login/RoleSelect'; // Optional: your role picker
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelect />} /> {/* optional home */}
        <Route path="/login/admin" element={<LoginAdmin />} />
        {/* Add other routes here later */}
      </Routes>
    </Router>
  );
}

export default App;
