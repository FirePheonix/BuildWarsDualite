import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProblemList from './components/ProblemList';
import ProblemDetail from './pages/ProblemDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<ProblemList />} />
          <Route path="/problem/:id" element={<ProblemDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
