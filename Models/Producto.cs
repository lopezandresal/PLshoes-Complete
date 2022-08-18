using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PLshoes_Complete.Models
{
    public partial class Producto
    {
        [Key]
        public int? ProdId { get; set; }
        public string? ProdNombre { get; set; }
        public string? ProdDescripcion { get; set; }
        public float? ProdPrecio { get; set; }
        public string? CatId { get; set; }
        public string? CodProducto { get; set; }
        public int? ProdStock { get; set; }
        public bool? ProdEstado { get; set; }
    }
}
