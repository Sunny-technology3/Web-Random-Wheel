import RandomWheel from './Page/RandomWheel/RandomWheel';
import { Routes, Route, Navigate  } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/game" />} />
      <Route path="/game" element={<RandomWheel />} />
    </Routes>
  );
}

export default App;
