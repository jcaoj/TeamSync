import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Projects from './Projects/Projects';
import './App.css';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Projects />}>
        <Route index element={<Projects />} />
        <Route path="projects" element={<Projects />} />
        <Route path="*" element={<Projects />} />
      </Route>
    </Routes>
  </BrowserRouter>

  );
}

export default App;
