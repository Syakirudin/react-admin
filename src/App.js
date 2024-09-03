import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/DashboardPage';
import BusStopPage from './pages/BusStopPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './components/NotFoundPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css'; // Global styling

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bus-stop" element={<BusStopPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
