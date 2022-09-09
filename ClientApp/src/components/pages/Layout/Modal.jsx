import '../../css/Modal.css';

const Modal = ({children, titulo, isOpen, closeModal}) =>{
    const handleModalClick = (e) => e.stopPropagation();
    return (
        <>
            {isOpen &&
                <div className="overlay" onClick={closeModal}>
                    <div className="contenedorModal" onClick={handleModalClick}>
                        <div className="encabezadoModal">
                            <h3>{titulo}</h3>
                        </div>
                        <button className='BotonCerrar' onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                            </svg>
                        </button>
                        {children}
                    </div>
                </div>
            }
        </>
    );
}
export default Modal;