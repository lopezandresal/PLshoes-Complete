using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PLshoes_Complete.Models
{
    public partial class Creditos
    {
        [Key]
        public int? CredId { get; set; }
        public int? CliId { get; set; }
        public int? CredNumCuotas { get; set; }
        public int? VentaId { get; set; }
        public DateTime? CredFecha { get; set; }
        public double? CredValorTotal { get; set; }
        public bool? CredEstado { get; set; }
    }
}
