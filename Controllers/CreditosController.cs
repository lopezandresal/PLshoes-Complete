using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PLshoes_Complete.Models;

namespace PLshoes_Complete.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreditosController : ControllerBase
    {
        private readonly PLshoesContext PLcontext;
        public CreditosController(PLshoesContext context)
        {
            PLcontext = context;
        }
        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> Listar()
        {
            List<Creditos> lista = PLcontext.Creditos.ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Creditos request)
        {
            await PLcontext.Creditos.AddAsync(request);
            await PLcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Ok");
        }

        [HttpPost]
        [Route("Actualizar")]
        //public async Task<IActionResult> Actualizar([FromBody] Ventas request)
        //{
        //    Ventas cliente = PLcontext.Ventas.Find(request.CliId);
        //    cliente.CliCedula = request.CliCedula;
        //    cliente.CliNombre = request.CliNombre;
        //    cliente.CliApellidos = request.CliApellidos;
        //    cliente.CliCelular = request.CliCelular;
        //    cliente.CliDireccion = request.CliDireccion;
        //    cliente.CliEmail = request.CliEmail;
        //    PLcontext.Clientes.Update(cliente);
        //    await PLcontext.SaveChangesAsync();
        //    return StatusCode(StatusCodes.Status200OK, "Ok");
        //}

        [HttpDelete]
            [Route("Eliminar/{id:int}")]
            public async Task<IActionResult> Eliminar(int id)
            {
            Creditos creditos = PLcontext.Creditos.Find(id);
                PLcontext.Creditos.Remove(creditos);
                await PLcontext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "Ok");
            }
        }
 }
