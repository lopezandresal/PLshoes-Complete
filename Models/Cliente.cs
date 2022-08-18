using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PLshoes_Complete.Models
{
    public partial class Cliente
    {
        [Key]
        public int? CliId { get; set; }
        public int? CliCedula { get; set; }
        public string? CliNombre { get; set; }
        public string? CliApellidos { get; set; }
        public int? CliCelular { get; set; }
        public string? CliDireccion { get; set; }
        public string? CliEmail { get; set; }
    }
}
