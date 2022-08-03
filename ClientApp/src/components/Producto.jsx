
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

    const handleSearch = (event) => {
        setSearch(event.target.value);
        console.log(event.target.value);
   };
    const dataBusqueda = productos.filter(item =>{if(item.prodNombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(search) || item.codProducto.includes(search)){ return item;}});

    const listarProductos = async () => {
        const response = await fetch("api/producto/Listar")
        if (response.status) {
            const data = await response.json();
            setProducto(data);
            return data;
        } else {
            console.log("Error al hacer la peticion: ", response.status);
        }
    }

     const guardarProducto = async (e) => {
        setEstadoModal1(!estadoModal1);
    //     e.preventDefault();
    //     const response = await fetch("api/producto/Guardar", {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json;charset=utf-8'
    //         }
    //         body: JSON.stringify({})
    //     })
    //     if (response.status) {
    //         const data = await response.json();
    //         setProducto(data);
    //         return data;
    //     } else {
    //         console.log("Error al hacer la peticion: ", response.status);
    //     }
     }

    const col = [
        {
        name: 'Acciones',
        cell: function () {return (
            <Dropdown>
            <Dropdown.Toggle 
            variant="success" 
            id="dropdown-basic">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        fill="currentColor" 
                        class="bi bi-three-dots-vertical" 
                        viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
            </Dropdown.Toggle>
      
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
    return (
        <div className="table-responsive ProdContainer">
            <Modal 
            estado={estadoModal1}
            cambiarEstado={setEstadoModal1}>
                <h1> HOLA XD</h1>
                <button> AGREGAR</button>
                <button className='btn btn-danger btn-sm' onClick={() => setEstadoModal1(false)}>Cancelar</button>
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
            <button className='btn btn-success' type='subtmit' onClick={guardarProducto}>Agregar</button>
            <DataTable
                columns={col}
                data={dataBusqueda}
                title="Productos"
                pagination
                fixedHeader
                fixedHeaderScrollHeight='600px'
                noDataComponent={<span>No se encontró ningun elemento</span>}
                 />
        </div>
    )
}
export default Producto;