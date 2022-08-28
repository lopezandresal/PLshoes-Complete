// import Producto from "./Producto";
import axios from "axios";
import { getListProductsURL,PostProductsURL } from "../../services/config";

export const ListarProductos = async () => { 
        return await axios.get(getListProductsURL).then(res => res.data)
}

export const AgregarProductos = async (e, producto) =>{
        // e.preventDefault()
       return await axios.post(PostProductsURL, producto).then(res => console.log(res.data))
}