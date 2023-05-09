import {Home} from "./components/home/home.tsx";
import {Productos} from "./components/producto/productos.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {DetalleProducto} from "./components/producto/detalleProducto.tsx";
import {DondeEstamos} from "./components/dondeEstamos/dondeEstamos.tsx";
import {Layout} from "./components/layout/layout.tsx";

function App() {

  return (
      <Layout>
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/dondeestamos" element={<DondeEstamos />} />
            <Route path="/productos/:id" Component={DetalleProducto} />
        </Routes>
      </Router>
      </Layout>
  )
}

export default App
