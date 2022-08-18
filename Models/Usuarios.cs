using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PLshoes_Complete.Models
{
    public partial class Usuarios
    {
        [Key]
        public int? UsuId { get; set; }
        public string? UsuNombre { get; set; }
        public string? UsuApellido { get; set; }

        [Required (ErrorMessage = "El usuario es obligatorio")]
        public string UsuUserName { get; set; }

        [Required(ErrorMessage = "La contraseña es obligatoria")]
        public string UsuPassword { get; set; }
    }
}
