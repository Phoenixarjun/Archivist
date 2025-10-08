import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css'
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
