
import '../../css/Producto.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from "react";
import Modal from '../Layout/Modal';
import InputComponent from '../Layout/Input';
import MaterialTable, { MTableToolbar } from '@material-table/core';
import Layout from '../Layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ListarProductos, AgregarProductos } from './ProductosPromises';
import GuardarProducto from './GuardarProducto'
const Producto = () => {
    const [Data, setData] = useState([]);   //Se listan los productos 
    const [estadoModal1,setEstadoModal1] = useState(false);
    const [estadoModal2,setEstadoModal2] = useState(false);
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
    const [estado, setEstado] = useState(true);

    

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
        ListarProductos().then(Data => setData(Data));
    }, [])

    const GuardarProducto = async (e) => {
        e.preventDefault()
        AgregarProductos(producto).then(res => {
            ListarProductos().then(Data => setData(Data))
        })
        .catch(error => {
            console.log("ERROR: ",error)
        })
        .finally(()=>{
            setEstadoModal1(false);
            setNuevoProducto("");
        })
    }

    //  const ActualizarEstado = async (id, estado) => {
    //     setEstado(!estado);
    //     const response = await fetch("api/producto/ActualizarEstado/" + id + "," +  estado, {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json;charset=utf-8'
    //         },
    //         // body: JSON.stringify(id, estado)
    //     })
    //     console.log('');
    //     if (response.ok) {
    //         await listarProductos();
    //     } else {
    //         console.log("Error al hacer la peticion: ", response.status);
    //     }
    //  }

    //  const actualizarProducto = async (e) => {
    //     e.preventDefault();
    //     const response = await fetch("api/producto/Actualizar", {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json;charset=utf-8'
    //         },
    //         body: JSON.stringify(productoEdit)
    //     })
    //     // console.log("informacion de productoEdit",productoEdit);
    //     if (response.ok) {
    //         await listarProductos();
    //         setEstadoModal2(false);
    //     } else {
    //         console.log("Error al hacer la peticion: ", response.status);
    //     }
    //  }

    //  const EliminarProducto = async (id) => {
    //     const response = await fetch("api/producto/Eliminar/" + id, {
    //         method: "DELETE"
    //     })
    //     console.log(producto);
    //     if (response.ok) {
    //         await listarProductos();
    //         console.log("Se elimino el producto");
    //     } else {
    //         console.log("Error al hacer la peticion: ", response.status);
    //     } 
        
    //  }
    
    return (
    <div>
        <Layout> 
        <div className="ProdContainer">
            {estado ? <GuardarProducto /> : console.log("no se reenderizó")}
{/* 
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
            </Modal> */}

            <MaterialTable
                columns={col}
                data={Data}
                title='Productos'
                // isLoading={props.loading}
                
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
                                {/* <Dropdown.Item onClick={() => {
                                    setProductoEdit(props.data)
                                    setEstadoModal2(!estadoModal2)
                                }}>Editar</Dropdown.Item>
                                <Dropdown.Item onClick={() => ActualizarEstado(props.data.prodId, estado)}>Desactivar</Dropdown.Item>
                                <Dropdown.Item onClick={() => EliminarProducto(props.data.prodId)}>Eliminar</Dropdown.Item> */}
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