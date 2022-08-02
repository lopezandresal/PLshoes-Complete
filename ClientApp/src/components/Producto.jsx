
import './Producto.css';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";

const Producto = () => {
    const [productos, setProducto] = useState([]);
    const [search, setSearch] = useState('');

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

    // const guardarProducto = async (e) => {
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
    // }

    const col = [
        {
        name: 'Acciones',
        cell: function () {return (<div>
            <button className='btn btn-info btn-sm'>Editar</button> 
            <button className='btn btn-danger btn-sm'>Desactivar</button>
        </div>);},
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
            <div className="barraBusqueda">
                <input
                    type="text"
                    placeholder="Buscar"
                    className="textField"
                    name="busqueda" 
                    onChange={handleSearch}
                    />
                <button type="button" className="btnBuscar" >Buscar</button>
            </div>
            <button className='btn btn-success' type='subtmit' >Agregar</button>
            <DataTable
                columns={col}
                data={dataBusqueda}
                title="Productos"
                pagination
                fixedHeader
                fixedHeaderScrollHeight='600px'
                noDataComponent={<span>No se encontró ningun elemento</span>} />
        </div>
    )
}
export default Producto;