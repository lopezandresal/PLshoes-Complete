using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PLshoes_Complete.Models;

namespace PLshoes_Complete.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly PLshoesContext PLcontext;
        public UsuariosController(PLshoesContext context)
        {
            PLcontext = context;
        }
        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> Listar()
        {
            List<Usuarios> lista = PLcontext.Usuarios.ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }
        [HttpGet]
        [Route("Listado")]
        public async Task<IActionResult> Listado()
        {
            List<Usuarios> lista = PLcontext.Usuarios.ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Usuarios request)
        {
            await PLcontext.Usuarios.AddAsync(request);
            await PLcontext.SaveChangesAsync();
            List<Usuarios> lista = PLcontext.Usuarios.ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Actualizar")]
        public async Task<IActionResult> Actualizar([FromBody] Usuarios request)
        {
            Usuarios usuarios = PLcontext.Usuarios.Find(request.UsuId);
            usuarios.UsuNombre = request.UsuNombre;
            usuarios.UsuApellido = request.UsuApellido;
            usuarios.UsuPassword = request.UsuPassword;
            usuarios.UsuUserName = request.UsuUserName;
            PLcontext.Usuarios.Update(usuarios);
            await PLcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Ok");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Usuarios usuarios = PLcontext.Usuarios.Find(id);
            PLcontext.Usuarios.Remove(usuarios);
            await PLcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Ok");
        }
    }
}
