using Microsoft.EntityFrameworkCore;
using backend.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Incontro> Incontri { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Incontro>()
            .HasOne(i => i.PartecipanteA)
            .WithMany(u => u.IncontriComeA)
            .HasForeignKey(i => i.PartecipanteAID)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Incontro>()
            .HasOne(i => i.PartecipanteB)
            .WithMany(u => u.IncontriComeB)
            .HasForeignKey(i => i.PartecipanteBID)
            .OnDelete(DeleteBehavior.Restrict);

        base.OnModelCreating(modelBuilder);
    }
} 