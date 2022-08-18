using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PLshoes_Complete.Models
{
    public partial class VentasDetalle
    {
        [Key]
        public int? VentaId { get; set; }
        public int? VentaDtId { get; set; }
        public int? ProdId { get; set; }
        public int? VentaCantidad { get; set; }
        public double? VentaPrecio_u { get; set; }
        public double? VentaDescuento { get; set; }
        public double? VentaTotal { get; set; }
    }
}
