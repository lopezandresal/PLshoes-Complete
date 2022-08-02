using System;
using System.Collections.Generic;

namespace PLshoes_Complete.Models
{
    public partial class Inventario
    {
        public string Id { get; set; } = null!;
        public string NombreArticulo { get; set; } = null!;
        public int Entradas { get; set; }
        public int Salidas { get; set; }
        public int Stock { get; set; }
    }
}
