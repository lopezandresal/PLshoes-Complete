// import Producto from "./Producto";
import axios from "axios";
import { getListProductsURL,PostSaveProductsURL, PostUpdateProductsURL} from "../../services/config";

export const ListarProductos = async () => { 
        return await axios.get(getListProductsURL).then(res => res.data)
}

export const AgregarProductos = async (producto) =>{
       return await axios.post(PostSaveProductsURL, producto).then(res => console.log(res.data))
}
export const ActualizarProductos = async (producto) => {
        return await axios.post(PostUpdateProductsURL, producto).then(res => console.log(res.data))
}