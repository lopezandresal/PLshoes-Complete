using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PLshoes_Complete.Models;

namespace PLshoes_Complete.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntradasController : ControllerBase
    {
        private readonly PLshoesContext PLcontext;
        public EntradasController(PLshoesContext context)
        {
            PLcontext = context;
        }
        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> Listar()
        {
            List<Entradas> lista = PLcontext.Entradas.ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Entradas request)
        {
            await PLcontext.Entradas.AddAsync(request);
            await PLcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Ok");
        }

        [HttpPost]
        [Route("Actualizar")]
        //public async Task<IActionResult> Actualizar([FromBody] Entradas request)
        //{
        //    Entradas entradas = PLcontext.Clientes.Find(request.EntId);
        //    cliente.CliCedula = request.CliCedula;
        //    cliente.CliNombre = request.CliNombre;
        //    cliente.CliApellidos = request.CliApellidos;
        //    cliente.CliCelular = request.CliCelular;
        //    cliente.CliDireccion = request.CliDireccion;
        //    cliente.CliEmail = request.CliEmail;
        //    PLcontext.Entradas.Update(cliente);
        //    await PLcontext.SaveChangesAsync();
        //    return StatusCode(StatusCodes.Status200OK, "Ok");
        //}

        [HttpDelete]
            [Route("Eliminar/{id:int}")]
            public async Task<IActionResult> Eliminar(int id)
            {
                Entradas entradas = PLcontext.Entradas.Find(id);
                PLcontext.Entradas.Remove(entradas);
                await PLcontext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "Ok");
            }
        }
 }
