
import '../css/Producto.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from "react";
import Modal from './Modal';
import InputComponent from './Input';
import MaterialTable, { MTableToolbar } from '@material-table/core';
import Layout from './Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Producto = () => {
    const [productos, setProducto] = useState([]);
    const [estadoModal1,setEstadoModal1] = useState(false);
    const [estadoModal2,setEstadoModal2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [producto, setNuevoProducto] = useState(
        {
            codProducto: '',
            prodNombre: '',
            prodDescripcion: '',
            prodPrecio: '',
            prodStock: '',
            prodEstado: true,
            catId: ''
        });
    const [productoEdit, setProductoEdit] = useState(
        {
                codProducto: '',
                prodNombre: '',
                prodDescripcion: '',
                prodPrecio: '',
                prodStock: '',
                prodEstado: true,
                catId: ''
        });
    const [estado, setEstado] = useState(false);
    const listarProductos = async () => {
        const response = await fetch("api/producto/Listar")
        if (response.status) {
            const data = await response.json();
            setProducto(data);
            
        } else {
            console.log("Error al hacer la peticion: ", response.status);
        }
    }

    const col = [
        {
        title: 'Codigo',
        field: 'codProducto',
        width: '60px'
        },
        {
        title: 'Nombre de producto',
        field: 'prodNombre'
        },
        {
        title: 'Descripcion',
        field: 'prodDescripcion'
        },
        {
        title: 'Precio',
        field: 'prodPrecio',
        width: '90px'
        },
        {
        title: 'Stock',
        field: 'prodStock',
        width: '70px'
        },
        {
        title: 'Estado',
        field: 'prodEstado'
    
        },
    ]

    useEffect(() => {
        setLoading(true);
        listarProductos().then(() => {
            setLoading(false)
        });
    }, [])

     const guardarProducto = async (e) => {
        e.preventDefault();
        const response = await fetch("api/producto/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(producto)
        })
        console.log(producto);
        if (response.ok) {
            setNuevoProducto("");
            await listarProductos();
            setEstadoModal1(false);
        } else {
            console.log("Error al hacer la peticion: ", response.status);
        }
     }

     const ActualizarEstado = async (id, estado) => {
        setEstado(!estado);
        const response = await fetch("api/producto/ActualizarEstado/" + id + "," +  estado, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            // body: JSON.stringify(id, estado)
        })
        console.log('');
        if (response.ok) {
            await listarProductos();
        } else {
            console.log("Error al hacer la peticion: ", response.status);
        }
     }

     const actualizarProducto = async (e) => {
        e.preventDefault();
        const response = await fetch("api/producto/Actualizar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(productoEdit)
        })
        // console.log("informacion de productoEdit",productoEdit);
        if (response.ok) {
            await listarProductos();
            setEstadoModal2(false);
        } else {
            console.log("Error al hacer la peticion: ", response.status);
        }
     }

     const EliminarProducto = async (id) => {
        const response = await fetch("api/producto/Eliminar/" + id, {
            method: "DELETE"
        })
        console.log(producto);
        if (response.ok) {
            await listarProductos();
            console.log("Se elimino el producto");
        } else {
            console.log("Error al hacer la peticion: ", response.status);
        } 
        
     }
    
    return (
    <div>
        <Layout logo='plshoes' > 
        <div className="ProdContainer">
            <Modal
                estado={estadoModal1}
                cambiarEstado={setEstadoModal1}
                titulo='Agregar Producto'>
                <div className='modal1'>
                    <form className='formularioModal' onSubmit={guardarProducto}>

                    <div className='inputContainer'>
                        {/* <label>Codigo</label> */}
                        <InputComponent
                            namehtml='codProducto'
                            label='Codigo'
                            labelClassName='labelClassName'
                            tipo='text'
                            placeholder='Digite codigo del producto'
                            valor={producto.codProducto}
                            AsignarValor={(e) => setNuevoProducto({ ...producto, codProducto: e.target.value })}
                        />
                    </div>
                    <div className='inputContainer'>
                        {/* <label>Nombre</label> */}
                        <InputComponent
                            namehtml='prodNombre'
                            label='Nombre'
                            labelClassName='labelClassName'
                            tipo='text'
                            placeholder='Escriba el nombre del producto'
                            valor={producto.prodNombre}
                            AsignarValor={(e) => setNuevoProducto({ ...producto, prodNombre: e.target.value })}
                        />
                    </div>
                        <div className='inputContainer'>
                        {/* <label>Precio</label> */}
                        <InputComponent
                            namehtml='prodPrecio'
                            label='Precio'
                            labelClassName='labelClassName'
                            tipo='number'
                            placeholder='Digite precio del producto'
                            valor={producto.prodPrecio}
                            AsignarValor={(e) => setNuevoProducto({ ...producto, prodPrecio: e.target.value })}
                        />
                        </div>
                        <div className='inputContainer'>
                        {/* <label>Stock</label> */}
                        <InputComponent
                            namehtml='prodStock'
                            label='Stock'
                            labelClassName='labelClassName'
                            tipo='number'
                            placeholder='Digite stock del producto'
                            valor={producto.prodStock}
                            AsignarValor={(e) => setNuevoProducto({ ...producto, prodStock: e.target.value })}
                        />
                        </div>
                        <div className='inputContainer'>
                        {/* <label>Categoria</label> */}
                        <InputComponent
                            namehtml='catId'
                            label='Categoria'
                            labelClassName='labelClassName'
                            tipo='number'
                            placeholder='Digite categoria del producto'
                            valor={producto.catId}
                            AsignarValor={(e) => setNuevoProducto({ ...producto, catId: e.target.value })}
                        />
                        </div>
                        <div className='inputContainer'>
                        <label htmlFor='prodDescripcion'>Descripcion</label>
                        <textarea
                            className='textareaComponent'
                            id='prodDescripcion'
                            placeholder='Escriba una descripcion del producto'
                            value={producto.prodDescripcion}
                            onChange={(e) => setNuevoProducto({ ...producto, prodDescripcion: e.target.value })}
                        />
                        </div>
                        <div className='ContenedorEstado'>
                            <label>
                                <input type='checkbox' placeholder='estado del producto' defaultChecked={producto.prodEstado} onChange={(e) => setNuevoProducto({ ...producto, prodEstado: e.target.checked })} />
                                Activar producto
                            </label>
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
                titulo='Modificar Producto'>
                <div className='modal1'>
                    <form className='formularioModal' onSubmit={actualizarProducto}>
                    <div className='inputContainer'>
                        <InputComponent
                            namehtml='CodProducto'
                            label='Codigo'
                            labelClassName='labelClassName'
                            tipo='text'
                            placeholder='Digite codigo del producto'
                            valor={productoEdit.codProducto}
                            AsignarValor={(e) => setProductoEdit({ ...productoEdit, codProducto: e.target.value })}
                        />
                    </div>
                        <div className='inputContainer'>
                        <InputComponent
                            namehtml='prodName'
                            label='Nombre'
                            labelClassName='labelClassName'
                            tipo='text'
                            placeholder='Escriba el nombre del producto'
                            valor={productoEdit.prodNombre}
                            AsignarValor={(e) => setProductoEdit({ ...productoEdit, prodNombre: e.target.value })}
                        />
                        </div>
                        <div className='inputContainer'>
                        <InputComponent
                            namehtml='prodPrecio'
                            label='Precio'
                            labelClassName='labelClassName'
                            tipo='number'
                            placeholder='Digite precio del producto'
                            valor={productoEdit.prodPrecio}
                            AsignarValor={(e) => setProductoEdit({ ...productoEdit, prodPrecio: e.target.value })}
                        />
                        </div>
                        <div className='inputContainer'>
                        <InputComponent
                            namehtml='prodStock'
                            label='Stock'
                            labelClassName='labelClassName'
                            tipo='number'
                            placeholder='Digite stock del producto'
                            valor={productoEdit.prodStock}
                            AsignarValor={(e) => setProductoEdit({ ...productoEdit, prodStock: e.target.value })}
                        />
                        </div>
                        <div className='inputContainer'> 
                        <InputComponent
                            namehtml='catId'
                            label='Categoria'
                            labelClassName='labelClassName'
                            tipo='number'
                            placeholder='Digite categoria del producto'
                            valor={productoEdit.catId}
                            AsignarValor={(e) => setProductoEdit({ ...productoEdit, catId: e.target.value })}
                        />
                        </div>
                        <div className='inputContainer'> 
                        <label htmlFor='prodDescripcion'>Descripcion</label>
                        <textarea
                            className='textareaComponent'
                            id='prodDescripcion'
                            placeholder='Escriba una descripcion del producto'
                            value={productoEdit.prodDescripcion}
                            onChange={(e) => setProductoEdit({ ...productoEdit, prodDescripcion: e.target.value })}
                        />
                        </div>
                        <div className='ContenedorEstado'>
                            <label>
                                <input type='checkbox' placeholder='estado del producto' defaultChecked={productoEdit.prodEstado} onChange={(e) => setProductoEdit({ ...productoEdit, prodEstado: e.target.checked })} />
                                Activar producto
                            </label>
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
                data={productos}
                title='Productos'
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
                                    setProductoEdit(props.data)
                                    setEstadoModal2(!estadoModal2)
                                }}>Editar</Dropdown.Item>
                                <Dropdown.Item onClick={() => ActualizarEstado(props.data.prodId, estado)}>Desactivar</Dropdown.Item>
                                <Dropdown.Item onClick={() => EliminarProducto(props.data.prodId)}>Eliminar</Dropdown.Item>
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
                

            // onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.prodId))}
            // options={{
            //     rowStyle: rowData => ({
            //         backgroundColor: (rowData.prodEstado) ? '#EEE' : '#ff0050'
            //     }),
            //     // tableLayout: "fixed"
            // }}
            />
        </div>
    </Layout>
    </div>
    )
}
export default Producto;