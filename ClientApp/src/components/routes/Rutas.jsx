import { Route, Routes } from "react-router-dom";
import Producto from "../pages/Producto";
import Error404 from "../pages/Error404";
import LogIn from "../pages/LogIn";
import Inicio from "../pages/Inicio";
import Clientes from "../pages/Clientes";

const Rutas = () =>{
    return ( 
            <Routes>
                <Route exact path='/productos' element={<Producto/>} />
                <Route path='*' element={<Error404 />} />
                <Route exact path='/' element={<LogIn />} />
                <Route exact path='/inicio' element={<Inicio/>} />
                <Route exact path='/clientes' element={<Clientes/>} />
            </Routes>
    );
}
export default Rutas;
