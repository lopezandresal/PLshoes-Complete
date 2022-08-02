using System;
using System.Collections.Generic;

namespace PLshoes_Complete.Models
{
    public partial class Producto
    {
        public string ProdId { get; set; } = null!;
        public string? ProdNombre { get; set; }
        public string? ProdDescripcion { get; set; }
        public float? ProdPrecio { get; set; }
        public string? CatId { get; set; }
        public string? CodProducto { get; set; }
        public int? ProdStock { get; set; }
        public bool? ProdEstado { get; set; }
    }
}
