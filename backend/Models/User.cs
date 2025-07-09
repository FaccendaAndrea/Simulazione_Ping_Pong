using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Nome { get; set; } = string.Empty;
        [Required]
        [MaxLength(50)]
        public string Cognome { get; set; } = string.Empty;
        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        public bool IscrittoAlTorneo { get; set; } = false;
        public bool OrganizzatoreDelTorneo { get; set; } = false;
        // Navigazione
        public ICollection<Incontro> IncontriComeA { get; set; }
        public ICollection<Incontro> IncontriComeB { get; set; }
    }
} 