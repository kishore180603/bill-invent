import Navbar from './components/Navbar';
import Billing from './components/Billing';
import Inventory from './components/Inventory';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
          <Route path="/" element={<Billing />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
