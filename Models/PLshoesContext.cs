using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PLshoes_Complete.Models
{
    public partial class PLshoesContext : DbContext
    {
        public PLshoesContext()
        {
        }

        public PLshoesContext(DbContextOptions<PLshoesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Categorium> Categoria { get; set; } = null!;
        public virtual DbSet<Cliente> Clientes { get; set; } = null!;
        public virtual DbSet<Inventario> Inventarios { get; set; } = null!;
        public virtual DbSet<Producto> Productos { get; set; } = null!;
        public virtual DbSet<Usuarios> Usuarios { get; set; } = null!;
        public virtual DbSet<Entradas> Entradas { get; set; } = null!;
        public virtual DbSet<Salidas> Salidas { get; set; } = null!;
        public virtual DbSet<Ventas> Ventas { get; set; } = null!;
        public virtual DbSet<VentasDetalle> VentasDetalle { get; set; } = null!;
        public virtual DbSet<Creditos> Creditos { get; set; } = null!;
        public virtual DbSet<Cuotas> Cuotas { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(local); DataBase=PLshoes;Integrated Security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Cliente>(entity =>
            {
                //entity.HasNoKey();

                entity.ToTable("Clientes");

                entity.Property(e => e.CliApellidos)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CliCedula)
                    .HasMaxLength(13)
                    .IsUnicode(false);

                entity.Property(e => e.CliDireccion)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CliEmail)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CliId)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.CliNombre)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                //entity.HasNoKey();

                entity.ToTable("Usuarios");

                entity.Property(e => e.UsuId)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.UsuNombre)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UsuApellido)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UsuUserName)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.UsuPassword)
                    .HasMaxLength(50)
                    .IsUnicode(false);

            });

            modelBuilder.Entity<Inventario>(entity =>
            {
                entity.ToTable("Inventario");

                entity.Property(e => e.Id)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Entradas).HasColumnName("entradas");

                entity.Property(e => e.NombreArticulo)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre_articulo");

                entity.Property(e => e.Salidas).HasColumnName("salidas");

                entity.Property(e => e.Stock).HasColumnName("stock");
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                //entity.HasNoKey();

                entity.ToTable("Producto");

                entity.Property(e => e.CatId)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.CodProducto)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ProdDescripcion)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.ProdId)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ProdNombre)
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });
            
            modelBuilder.Entity<Categorium>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CatId)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.CatNombre)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });
            
            modelBuilder.Entity<Entradas>(entity =>
            {
                //entity.HasNoKey();

                entity.ToTable("Entradas");

                entity.Property(e => e.EntId)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.EntFecha)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ProdId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.EntCantidad)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.precio_compra)
                    .HasMaxLength(50)
                    .IsUnicode(false);

            });

            modelBuilder.Entity<Salidas>(entity =>
            {
                //entity.HasNoKey();

                entity.ToTable("Salidas");

                entity.Property(e => e.SalidId)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.SalidFecha)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ProdId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.SalidCantidad)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Precio_venta)
                    .HasMaxLength(50)
                    .IsUnicode(false);

            });

            modelBuilder.Entity<Cuotas>(entity =>
            {
                //entity.HasNoKey();

                entity.ToTable("Cuotas");

                entity.Property(e => e.CredId)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.CuotId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CuotNum)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CuotValor)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.CuotEstado)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CuotFechaPago)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                

            });

            modelBuilder.Entity<Ventas>(entity =>
            {
                //entity.HasNoKey();

                entity.ToTable("Ventas");

                entity.Property(e => e.VentaId)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.VentaFecha)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CliId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.VentaTipo)
                    .HasMaxLength(15)
                    .IsUnicode(false);

            });

            modelBuilder.Entity<VentasDetalle>(entity =>
            {
                //entity.HasNoKey();

                entity.ToTable("VentasDetalle");

                entity.Property(e => e.VentaId)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.VentaDtId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ProdId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.VentaCantidad)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.VentaPrecio_u)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.VentaDescuento)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.VentaTotal)
                    .HasMaxLength(50)
                    .IsUnicode(false);


            });

            modelBuilder.Entity<Creditos>(entity =>
            {
                //entity.HasNoKey();

                entity.ToTable("Creditos");

                entity.Property(e => e.CredId)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.CliId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CredNumCuotas)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.VentaId)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.CredFecha)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CredValorTotal)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CredEstado)
                    .HasMaxLength(50)
                    .IsUnicode(false);


            });


            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
