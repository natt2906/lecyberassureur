import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TestimonialsPage from './pages/TestimonialsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/temoignages" element={<TestimonialsPage />} />
    </Routes>
  );
}

export default App;
