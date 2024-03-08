import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Projects from './Projects/Projects';
import Teams from './Teams/Teams';
import Posts from './Projects/CreatePost';
import ViewProject from "./Projects/ViewProject";
import './App.css';
import Layout from './Layout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Projects />} />
          <Route path="projects" element={<Projects />} />
          <Route path="teams" element={<Teams />} />
          <Route path="posts" element={<Posts />} />
          <Route exact path="/viewProject/:id" element={<ViewProject/>} />
          <Route path="*" element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
