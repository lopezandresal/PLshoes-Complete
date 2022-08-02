import {isMobile} from 'react-device-detect';
import './BarraDeNavegacion.css';
const BarraNavegacion = () => {
    if(!isMobile){
        return (
        <div>
            <nav className="nav flex">
            <li className="nav-itemPC">
                <a className="nav-link active" aria-current="page" href="#">Principal</a>
            </li>
            
            <li className="nav-itemPC">
                <a className="nav-link" href="#">Productos</a>
            </li>
            <li className="nav-itemPC">    
                <a className="nav-link" href="#">Clientes</a>
            </li>

            <li className="nav-itemPC">
                <a className="nav-link" href="#">Inventario</a>
            </li>
            </nav>
        </div>
        )
    } else{
        return (
            <div>
            <nav className="nav justify-content-center">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Principal</a>
            </li>
            
            <li className="nav-item">
                <a className="nav-link" href="#">Productos</a>
            </li>
            <li className="nav-item">    
                <a className="nav-link" href="#">Clientes</a>
            </li>

            <li className="nav-item">
                <a className="nav-link" href="#">Inventario</a>
            </li>
            </nav>
            </div>
        )
    }
}
export default BarraNavegacion;