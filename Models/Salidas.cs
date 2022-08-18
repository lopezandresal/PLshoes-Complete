using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PLshoes_Complete.Models
{
    public partial class Salidas
    {
        [Key]
        public int? SalidId { get; set; }
        public DateTime? SalidFecha { get; set; }
        public int? ProdId { get; set; }
        public int? SalidCantidad { get; set; }
        public double? Precio_venta { get; set; }
    }
}
