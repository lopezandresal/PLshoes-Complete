using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PLshoes_Complete.Models
{
    public partial class Cuotas
    {
        [Key]
        public int? CredId { get; set; }
        public int? CuotId { get; set; }
        public int? CuotNum { get; set; }
        public double? CuotValor { get; set; }
        public bool? CuotEstado { get; set; }
        public DateTime? CuotFechaPago { get; set; }
    }
}
