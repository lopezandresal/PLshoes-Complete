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

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.HasNoKey();

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
                entity.HasNoKey();

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

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
