import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Landing from "./pages/Landing";
import { Toaster } from "./components/ui/toaster";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  useEffect(() => {
    // Fuerza tema oscuro global para evitar bajo contraste en algunos entornos
    document.documentElement.classList.add("dark");

    const helloWorldApi = async () => {
      try {
        if (!BACKEND_URL) return; // evita request innecesaria en producción estática
        const response = await axios.get(`${API}/`);
        console.log(response.data.message);
      } catch (e) {
        console.error(e, `errored out requesting / api`);
      }
    };

    helloWorldApi();
  }, []);

  return <Landing />;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;