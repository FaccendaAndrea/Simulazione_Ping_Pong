﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.0");

            modelBuilder.Entity("backend.Models.Incontro", b =>
                {
                    b.Property<int>("IncontroID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Data")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Giocato")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PartecipanteAID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PartecipanteBID")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("PuntiA")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("PuntiB")
                        .HasColumnType("INTEGER");

                    b.HasKey("IncontroID");

                    b.HasIndex("PartecipanteAID");

                    b.HasIndex("PartecipanteBID");

                    b.ToTable("Incontri");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Cognome")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<bool>("IscrittoAlTorneo")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<bool>("OrganizzatoreDelTorneo")
                        .HasColumnType("INTEGER");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("backend.Models.Incontro", b =>
                {
                    b.HasOne("backend.Models.User", "PartecipanteA")
                        .WithMany("IncontriComeA")
                        .HasForeignKey("PartecipanteAID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("backend.Models.User", "PartecipanteB")
                        .WithMany("IncontriComeB")
                        .HasForeignKey("PartecipanteBID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("PartecipanteA");

                    b.Navigation("PartecipanteB");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Navigation("IncontriComeA");

                    b.Navigation("IncontriComeB");
                });
#pragma warning restore 612, 618
        }
    }
}
