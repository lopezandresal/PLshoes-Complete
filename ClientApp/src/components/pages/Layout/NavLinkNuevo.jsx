import '../../css/BarraDeNavegacion.css';
import { NavLink as NavLinkNuevo } from "react-router-dom";

const NavLink = ({to, children, ...props}) => {
    return (
        <NavLinkNuevo 
        {...props}
        className={ ({isActive}) => {return isActive ? 'nav-link active' : 'nav-link' }}
        to={to}>{children}</NavLinkNuevo>
    );
}
export default NavLink;