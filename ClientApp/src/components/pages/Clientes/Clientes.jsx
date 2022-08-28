
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from "react";
import Modal from '../Layout/Modal';
import InputComponent from '../Layout/Input';
import MaterialTable, { MTableToolbar } from '@material-table/core';
import Layout from '../Layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [estadoModal1,setEstadoModal1] = useState(false);
    const [estadoModal2,setEstadoModal2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cliente, setNuevoCliente] = useState(
        {
            cliCedula: '',
            cliNombre: '',
            cliApellidos: '',
            cliCelular: '',
            cliDireccion: '',
            cliEmail: ''
        });
    const [clienteEdit, setClienteEdit] = useState(
        {
            cliCedula: '',
            cliNombre: '',
            cliApellidos: '',
            cliCelular: '',
            cliDireccion: '',
            cliEmail: ''
        });
            
    const listarClientes = async () => {
        const response = await fetch("api/cliente/Listar")
        if (response.status) {
            const data = await response.json();
            setClientes(data);
            
        } else {
            console.log("Error al hacer la peticion: ", response.status);
        }
    }

    const col = [
        {
        title: 'Cedula',
        field: 'cliCedula',
        width: '60px'
        },
        {
        title: 'Nombre',
        field: 'cliNombre'
        },
        {
        title: 'Apellidos',
        field: 'cliApellidos'
        },
        {
        title: 'Telefono',
        field: 'cliCelular',
        width: '90px'
        },
        {
        title: 'Direccion',
        field: 'cliDireccion',
        width: '70px'
        },
        {
        title: 'Email',
        field: 'cliEmail'
    
        },
    ]

    useEffect(() => {
        setLoading(true);
        listarClientes().then(() => {
            setLoading(false)
        });
    }, [])

    const guardarCliente = async (e) => {
        e.preventDefault();
        const response = await fetch("api/cliente/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(cliente)
        })
        console.log(cliente);
        if (response.ok) {
            setNuevoCliente("");
            await listarClientes();
            setEstadoModal1(false);
        } else {
            console.log("Error al hacer la peticion: ", response.status);
        }
     }

     const ActualizarCliente = async (e) => {
        e.preventDefault();
        const response = await fetch("api/cliente/Actualizar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(clienteEdit)
        })
        console.log("informacion de clienteEdit",clienteEdit);
        if (response.ok) {
            await listarClientes();
            setEstadoModal2(false);
        } else {
            console.log("Error al hacer la peticion: ", response.status);
        }
     }

     const EliminarCliente = async (id) => {
        const response = await fetch("api/cliente/Eliminar/" + id, {
            method: "DELETE"
        })
        console.log(cliente);
        if (response.ok) {
            await listarClientes();
            console.log("Se elimino el producto");
        } else {
            console.log("Error al hacer la peticion: ", response.status);
        } 
        
     }
    
    return (
    <div>
        <Layout logo='plshoes' > 
        <div className="CliContainer">
            <Modal
                estado={estadoModal1}
                cambiarEstado={setEstadoModal1}
                titulo='Agregar Cliente'>
                <div>
                    <form className='formularioModal' onSubmit={guardarCliente}>
                    <div className='inputContainer'>
                        <InputComponent
                            namehtml='cliCedula'
                            label='Cedula'
                            labelClassName='labelClassName'
                            tipo='text'
                            placeholder='Digite cedula de cliente'
                            valor={cliente.cliCedula}
                            AsignarValor={(e) => setNuevoCliente({ ...cliente, cliCedula: e.target.value })}
                        />
                    </div>
                        <div className='inputContainer'>
                        <InputComponent
                            namehtml='cliNombre'
                            label='Nombre'
                            labelClassName='labelClassName'
                            tipo='text'
                            placeholder='Nombre del cliente'
                            valor={cliente.cliNombre}
                            AsignarValor={(e) => setNuevoCliente({ ...cliente, cliNombre: e.target.value })}
                        />
                        </div>
                        <div className='inputContainer'>
                        <InputComponent
                            namehtml='cliApellidos'
                            label='Apellidos'
                            labelClassName='labelClassName'
                            tipo='text'
                            placeholder='Apellidos del cliente'
                            valor={cliente.cliApellidos}
                            AsignarValor={(e) => setNuevoCliente({ ...cliente, cliApellidos: e.target.value })}
                        />
                        </div>
                        <div className='inputContainer'>
                        <InputComponent
                            namehtml='cliCelular'
                            label='Celular'
                            labelClassName='labelClassName'
                            tipo='number'
                            placeholder='Digite el numero del cliente'
                            valor={cliente.cliCelular}
                            AsignarValor={(e) => setNuevoCliente({ ...cliente, cliCelular: e.target.value })}
                        />
                        </div>
                        <div className='inputContainer'>
                        <InputComponent
                            namehtml='cliDireccion'
                            label='Direccion'
                            labelClassName='labelClassName'
                            tipo='text'
                            placeholder='Escriba la direccion del cliente'
                            valor={cliente.cliDireccion}
                            AsignarValor={(e) => setNuevoCliente({ ...cliente, cliDireccion: e.target.value })}
                        />
                        </div>
                        <div className='inputContainer'>
                        <InputComponent
                            namehtml='cliEmail'
                            label='Email'
                            labelClassName='labelClassName'
                            tipo='email'
                            placeholder='Email del cliente'
                            valor={cliente.cliEmail}
                            AsignarValor={(e) => setNuevoCliente({ ...cliente, cliEmail: e.target.value })}
                        />
                        </div>
                        <div className='BotonesCentrados'>
                            <button className='btn btn-info btn-sm' type='submit'> Agregar</button>
                            <button className='btn btn-danger btn-sm' onClick={() => setEstadoModal1(false)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal
                estado={estadoModal2}
                cambiarEstado={setEstadoModal2}
                titulo='Modificar Cliente'>
                <div>
                    <form className='formularioModal' onSubmit={ActualizarCliente}>
                    <div className='inputContainer'>
                        <InputComponent
                            namehtml='cliCedula'
                            label='Cedula'
                            labelClassName='labelClassName'
                            tipo='text'
                            placeholder='Digite cedula de cliente'
                            valor={clienteEdit.cliCedula}
                            AsignarValor={(e) => setClienteEdit({ ...clienteEdit, cliCedula: e.target.value })}
                        />
                    </div>
                    <div className='inputContainer'>

                        <InputComponent
                            namehtml='cliNombre'
                            label='Nombre'
                            labelClassName='labelClassName'
                            tipo='text'
                            placeholder='Nombre del cliente'
                            valor={clienteEdit.cliNombre}
                            AsignarValor={(e) => setClienteEdit({ ...clienteEdit, cliNombre: e.target.value })}
                        />
                    </div>
                    <div className='inputContainer'>

                        <InputComponent
                            namehtml='cliApellidos'
                            label='Apellidos'
                            labelClassName='labelClassName'
                            tipo='text'
                            placeholder='Apellidos del cliente'
                            valor={clienteEdit.cliApellidos}
                            AsignarValor={(e) => setClienteEdit({ ...clienteEdit, cliApellidos: e.target.value })}
                        />
                    </div>
                    <div className='inputContainer'>

                        <InputComponent
                            namehtml='cliCelular'
                            label='Celular'
                            labelClassName='labelClassName'
                            tipo='number'
                            placeholder='Digite el numero del cliente'
                            valor={clienteEdit.cliCelular}
                            AsignarValor={(e) => setClienteEdit({ ...clienteEdit, cliCelular: e.target.value })}
                        />
                    </div>
                    <div className='inputContainer'>

                        <InputComponent
                            namehtml='cliDireccion'
                            label='Direccion'
                            labelClassName='labelClassName'
                            tipo='text'
                            placeholder='Escriba la direccion del cliente'
                            valor={clienteEdit.cliDireccion}
                            AsignarValor={(e) => setClienteEdit({ ...clienteEdit, cliDireccion: e.target.value })}
                        />
                    </div>
                        <div className='inputContainer'>

                        <InputComponent
                            namehtml='cliEmail'
                            label='Email'
                            labelClassName='labelClassName'
                            tipo='email'
                            placeholder='Email del cliente'
                            valor={clienteEdit.cliEmail}
                            AsignarValor={(e) => setClienteEdit({ ...clienteEdit, cliEmail: e.target.value })}
                        />
                        </div>
                        
                        <div className='BotonesCentrados'>
                            <button className='btn btn-info btn-sm' type='submit' > Confirmar</button>
                            <button className='btn btn-danger btn-sm' onClick={() => setEstadoModal2(false)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </Modal>

            <MaterialTable
                columns={col}
                data={clientes}
                title='Clientes'
                isLoading={loading}
                
                components={{
                    Action: props => (
                        <Dropdown>
                            <Dropdown.Toggle
                                className='custom'
                                id="dropdown-basic">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-three-dots-vertical trespuntos"
                                    viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => {
                                    setClienteEdit(props.data)
                                    setEstadoModal2(!estadoModal2)
                                }}>Editar</Dropdown.Item>
                                <Dropdown.Item onClick={() => EliminarCliente(props.data.cliId)}>Eliminar</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ),
                    Toolbar: props => (
                        <div className='ContainerBtnAddProd'><MTableToolbar {...props} />
                            <button className='btnAddProd' onClick={() => setEstadoModal1(!estadoModal1)}><FontAwesomeIcon icon={faPlus} className='' /></button>
                        </div>

                    )
                }}
                columnsHiddenInColumnsButton = 'true'
                actions={[
                    {
                        icon: 'save',
                        tooltip: 'Save User'
                    }
                ]}
              
            />
        </div>
    </Layout>
    </div>
    )
}
export default Clientes;