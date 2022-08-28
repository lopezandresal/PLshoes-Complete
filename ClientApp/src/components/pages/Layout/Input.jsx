import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../../css/Producto.css';

export default function InputComponent({namehtml, label, tipo, placeholder, valor, AsignarValor, labelClassName}) {
    return (
        <div className='contenedorClassInput'>
            <label className={labelClassName} htmlFor={namehtml}>{label}</label>
            <div className='GroupInput'>
                <input 
                    type={tipo} 
                    className='Input'
                    placeholder={placeholder}
                    id={namehtml}
                    value={valor}
                    onChange={AsignarValor} required />
                <FontAwesomeIcon icon={faCheckCircle} className='IconoValidacion' />
            </div>
        </div>
    )
};

