import '../../css/Layout.css';
import BarraNavegacion from './BarraDeNavegacion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
// import {prueba} from './Layout'
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

//Colors https://colorcodes.io/gray/rich-gray-color-codes/
const Layout = ({children}) => {
    const [status, setStatus] = useState(true);
    // const [clase, setClase] = useState('aside');
    const navigation = useNavigate();
    const cookies = new Cookies();

    const LogOut = () =>{
        cookies.remove('id', {path: "/"});
        cookies.remove('nombre', {path: "/"});
        cookies.remove('apellido', {path: "/"});
        cookies.remove('username', {path: "/"});
        navigation('/');
    }

    function validarSesion(){
        if(!cookies.get('username')){
            navigation('/');
        }
    }
    
    const log = ()=>{
        setStatus(!status)
        // setClase(status ? 'aside activeSideBar' : 'aside')
        // console.log(clase);
    }
    useEffect(() => {
        // log();
        validarSesion();
    }, [])
    
    return (
        <div className="grid-contenedor">
            <header className="header">
                <div className='ContainerElementosHeader'>
                    <div className='ContainerBtnShow'>
                        <button className='BtnShow' onClick={log}>&#9776;</button>
                    </div>
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="custom"
                                id="dropdown-basic"
                                className='BtnUserDrop'>

                                <FontAwesomeIcon className='buttonUser' icon={faUserCircle} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={LogOut} >Cerrar sesión</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                </div>
            </header>
            <aside id='sidebar' className={status ? 'aside activeSideBar' : 'aside'} >
            <p className='LogoText'>plshoes</p>
                <BarraNavegacion />
            </aside>
            <main className="main">
                {children}
            </main>
        </div>
    )
}
export default Layout;