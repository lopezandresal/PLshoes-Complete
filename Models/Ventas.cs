using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PLshoes_Complete.Models
{
    public partial class Ventas
    {
        [Key]
        public int? VentaId { get; set; }
        public DateTime? VentaFecha { get; set; }
        public int? CliId { get; set; }
        public int? VentaTipo { get; set; }

    }
}
