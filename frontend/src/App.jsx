import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginAdmin from './components/LoginAdmin.jsx';
import RoleSelect from './components/RoleSelect.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelect />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
        {/* Add more routes like doctor, hospital, etc. here later */}
      </Routes>
    </Router>
  );
}

export default App;
