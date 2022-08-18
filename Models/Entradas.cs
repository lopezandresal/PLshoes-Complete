using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PLshoes_Complete.Models
{
    public partial class Entradas
    {
        [Key]
        public int? EntId { get; set; }
        public DateTime? EntFecha { get; set; }
        public int? ProdId { get; set; }
        public int? EntCantidad { get; set; }
        public double? precio_compra { get; set; }
    }
}
