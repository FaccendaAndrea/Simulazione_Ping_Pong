using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Incontro
    {
        [Key]
        public int IncontroID { get; set; }

        [Required]
        public DateTime Data { get; set; }

        [Required]
        [ForeignKey("PartecipanteA")]
        public int PartecipanteAID { get; set; }
        [Required]
        [ForeignKey("PartecipanteB")]
        public int PartecipanteBID { get; set; }

        public bool Giocato { get; set; } = false;
        public int? PuntiA { get; set; }
        public int? PuntiB { get; set; }

        // Navigazione
        public User PartecipanteA { get; set; }
        public User PartecipanteB { get; set; }
    }
} 