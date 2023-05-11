import {Home} from "./components/home/home.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {DetalleProducto} from "./components/producto/detalleProducto.tsx";
import {DondeEstamos} from "./components/dondeEstamos/dondeEstamos.tsx";
import {Productos} from "./components/producto/productos.tsx";
import {Administracion} from "./components/admin/administracion.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {

    return (
        <>
            <ToastContainer/>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/productos" element={<Productos/>} />
                    <Route path="/dondeestamos" element={<DondeEstamos />} />
                    <Route path="/productos/:id" Component={DetalleProducto} />
                    <Route path="/administracion" element={<Administracion/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
