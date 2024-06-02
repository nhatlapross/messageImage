
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Layout from "./pages/Layout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />  
          <Route path="result" element={<Result />} />
        </Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
