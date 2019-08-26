using Microsoft.EntityFrameworkCore;

namespace DataAccessLibrary.Models
{
    public class MarvelDCStoreDBContext : DbContext
    {
        public MarvelDCStoreDBContext()
        {
        }

        public MarvelDCStoreDBContext(DbContextOptions<MarvelDCStoreDBContext> options) : base(options)
        {
        }

        public DbSet<Product> Product { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=FROESNEWDELL\\SQLEXPRESS2017;Database=MarvelDCStore;User Id=sa;Password=dti@;");
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Product>().HasKey(m => m.ProductID);
            base.OnModelCreating(builder);
        }
    }
}
