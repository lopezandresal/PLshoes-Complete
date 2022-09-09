import InputComponent from '../Layout/Input';
import {  ActualizarProductos } from './ProductosPromises';
import { useState } from "react";


const ActualizarProductoModulo = ({children, productoInfo}) =>{
    const [productoEdit, setProductoEdit] = useState(productoInfo);


    const actualizarProducto = async (e) => {
        e.preventDefault();
        ActualizarProductos(productoEdit).then(res => {
            console.log(res)
        })
        .catch(error =>{
            console.log(error)
        })
        .finally(() => {
            setProductoEdit('')
        })
     }
    return (
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
                            {children}
                        </div>
                    </form>
    )
}
export default ActualizarProductoModulo;