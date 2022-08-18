using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PLshoes_Complete.Models;

namespace PLshoes_Complete.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly PLshoesContext PLcontext;
        public ProductoController(PLshoesContext context)
        {
            PLcontext = context;
        }
        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> Listar()
        {
            List<Producto> lista = PLcontext.Productos.ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Producto request)
        {
            await PLcontext.Productos.AddAsync(request);
            await PLcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Ok");
        }

        [HttpPost]
        [Route("Actualizar")]
        public async Task<IActionResult> Actualizar([FromBody] Producto request)
        {
            Producto producto = PLcontext.Productos.Find(request.ProdId);
            producto.ProdNombre = request.ProdNombre;
            producto.CodProducto = request.CodProducto;
            producto.ProdStock = request.ProdStock;
            producto.CatId = request.CatId;
            producto.ProdDescripcion = request.ProdDescripcion;
            producto.ProdPrecio = request.ProdPrecio;
            producto.ProdEstado = request.ProdEstado;
            PLcontext.Productos.Update(producto);
            await PLcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Ok");
        }

        [HttpPost]
        [Route("ActualizarEstado/{id:int},{status:bool}")]
        public async Task<IActionResult> ActualizarEstado(int id, bool status)
        {
            Producto producto = PLcontext.Productos.Find(id);
            producto.ProdEstado = status;
            PLcontext.Productos.Update(producto);
            await PLcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Ok");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Producto producto = PLcontext.Productos.Find(id);
            PLcontext.Productos.Remove(producto);
            await PLcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Ok");
        }
    }
}
