import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Invitation from './pages/Invitation';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Invitation />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
