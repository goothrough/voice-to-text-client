import './App.css';
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Initial Page */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        {/* 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
