using System;
using System.Collections.Generic;

namespace PLshoes_Complete.Models
{
    public partial class Cliente
    {
        public string CliId { get; set; } = null!;
        public string? CliCedula { get; set; }
        public string? CliNombre { get; set; }
        public string? CliApellidos { get; set; }
        public int? CliCelular { get; set; }
        public string? CliDireccion { get; set; }
        public string? CliEmail { get; set; }
    }
}
