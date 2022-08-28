import '../../css/Modal.css';

const Modal = ({children, estado, titulo, cambiarEstado}) =>{
    return (
        <div>
            {estado &&
                <div className="overlay">
                    <div className="contenedorModal">
                        <div className="encabezadoModal">
                            <h3>{titulo}</h3>
                        </div>
                        <button className='BotonCerrar' onClick={() => cambiarEstado(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                            </svg>
                        </button>
                        {children}
                    </div>
                </div>
            }
        </div>
    );
}
export default Modal;