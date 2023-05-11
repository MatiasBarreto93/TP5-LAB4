import {Home} from "./components/home/home.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {DetalleProducto} from "./components/producto/detalleProducto.tsx";
import {DondeEstamos} from "./components/dondeEstamos/dondeEstamos.tsx";
import {Productos} from "./components/producto/productos.tsx";
import {Administracion} from "./components/admin/administracion.tsx";
import {Test} from "./components/TestModal/test.tsx";

function App() {

  return (
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos/>} />
            <Route path="/dondeestamos" element={<DondeEstamos />} />
            <Route path="/productos/:id" Component={DetalleProducto} />
            <Route path="/admin" element={<Administracion/>}/>
            <Route path="/test" element={<Test/>}/>
        </Routes>
      </Router>
  )
}

export default App
