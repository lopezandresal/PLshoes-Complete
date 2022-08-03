
import './Producto.css';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from "react";
import Modal from './Modal';

const Producto = () => {
    const [productos, setProducto] = useState([]);
    const [search, setSearch] = useState('');
    const [estadoModal1,setEstadoModal1] = useState(false);
    const [producto, setNuevoProducto] = useState(
        {
            codProducto: '',
            prodNombre: '',
            prodDescripcion: '',
            prodPrecio: '0',
            prodStock: '0',
            prodEstado: true,
            catId: '',
            prodId: ''
        }
        );

    const handleSearch = (event) => {
        setSearch(event.target.value);
        console.log(event.target.value);
   };
    const dataBusqueda = productos.filter(item =>{if(item.prodNombre !== ''&& item.codProducto !== ''){if(item.prodNombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(search) || item.codProducto.includes(search)){ return item;}}});

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
        name: 'Acciones',
        cell: function (row) {return (
            <Dropdown>
            <Dropdown.Toggle 
            variant="success" 
            id="dropdown-basic">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        fill="currentColor" 
                        className="bi bi-three-dots-vertical" 
                        viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
            </Dropdown.Toggle>
      
            <Dropdown.Menu>
              <Dropdown.Item >Editar</Dropdown.Item>
              <Dropdown.Item >Desactivar</Dropdown.Item>
              <Dropdown.Item  onClick={() => EliminarProducto(row.prodId) }>Eliminar</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
                    );
                    
            },
        searchable: false,
        orderable: false,
        ignoreRowClick: true,
        allowOverflow: true,
        },
        {
        name: 'Codigo',
        selector: row => row.codProducto,
        sortable: true,
        searchable: true
        },
        {
        name: 'Nombre de producto',
        selector: row => row.prodNombre,
        sortable: true,
        grow: 3
        },
        {
        name: 'Descripcion',
        selector: row => row.prodDescripcion,
        sortable: true
        },
        {
        name: 'Precio',
        selector: row => row.prodPrecio,
        sortable: true
        },
        {
        name: 'Stock',
        selector: row => row.prodStock,
        sortable: true
        },
    ]

    useEffect(() => {
        listarProductos();
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
        <div className="table-responsive ProdContainer">
            <Modal 
            estado={estadoModal1}
            cambiarEstado={setEstadoModal1}>
                <h1> Agregar Producto</h1>
                <form onSubmit={guardarProducto}>
                <input type='text' placeholder='codigo del producto' value={producto.codProducto} onChange={(e) => setNuevoProducto({...producto, codProducto: e.target.value})}/>
                <input type='text' placeholder='nombre del producto' value={producto.prodNombre} onChange={(e) => setNuevoProducto({...producto, prodNombre: e.target.value})} />
                <input type='text' placeholder='descripcion del producto' value={producto.prodDescripcion} onChange={(e) => setNuevoProducto({...producto, prodDescripcion: e.target.value})} />
                <input type='number' placeholder='precio del producto' value={producto.prodPrecio} onChange={(e) => setNuevoProducto({...producto, prodPrecio: e.target.value})} />
                <input type='number' placeholder='stock del producto' value={producto.prodStock} onChange={(e) => setNuevoProducto({...producto, prodStock: e.target.value})}/>
                <input type='number' placeholder='categoria id del producto' value={producto.catId} onChange={(e) => setNuevoProducto({...producto, catId: e.target.value})}/>
                <input type='number' placeholder='id del producto' value={producto.prodId} onChange={(e) => setNuevoProducto({...producto, prodId: e.target.value})}/>
                <input type='text' placeholder='estado del producto' value={producto.prodEstado} onChange={(e) => setNuevoProducto({...producto, prodEstado: e.target.value})}/>

                <button className='btn btn-info btn-sm' type='submit' onClick={guardarProducto}> AGREGAR</button>
                <button className='btn btn-danger btn-sm' onClick={() => setEstadoModal1(false)}>Cancelar</button>
                </form>
            </Modal>
            <div className="barraBusqueda">
                <input
                    type="text"
                    placeholder="Buscar"
                    className="textField"
                    name="busqueda" 
                    onChange={handleSearch}
                    />
            </div>
            <button className='btn btn-success' onClick={() =>setEstadoModal1(!estadoModal1)}>Agregar</button>
            <DataTable
                columns={col}
                data={dataBusqueda}
                title="Productos"
                pagination
                fixedHeader
                fixedHeaderScrollHeight='600px'
                noDataComponent={<span>No se encontró ningun elemento</span>}
                className='TablaR'
                selectedRows
                scrollx
                 />
        </div>
    )
}
export default Producto;