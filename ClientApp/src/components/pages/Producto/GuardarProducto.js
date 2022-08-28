import Modal from '../Layout/Modal';
import InputComponent from '../Layout/Input';
import {  AgregarProductos } from './ProductosPromises';
import { useState } from "react";


const GuardarProductoModulo = ({estadop}) =>{
    const [estadoModal1,setEstadoModal1] = useState(estadop);

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

    const GuardarProducto = async (e) => {
            e.preventDefault()
            AgregarProductos(producto).then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log("ERROR: ",error)
            })
            .finally(()=>{
                // setEstadoModal1(false);
                setNuevoProducto("");
            })
        }
    return (
        <>
            {estadop &&
                <form className='formularioModal' onSubmit={GuardarProducto}>
                    <div className='inputContainer'>
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
                                <input type='checkbox' defaultChecked={producto.prodEstado} onChange={(e) => setNuevoProducto({ ...producto, prodEstado: e.target.checked })} />
                                Activar producto
                            </label>
                        </div>
                        <div className='BotonesCentrados'>
                            <button className='btn btn-info btn-sm' type='submit'> Agregar</button>
                            <button className='btn btn-danger btn-sm' onClick={() => setEstadoModal1(!estadop)}>Cancelar</button>
                        </div>
                    </form> 
                    }
                    </>
    )
}
export default GuardarProductoModulo;