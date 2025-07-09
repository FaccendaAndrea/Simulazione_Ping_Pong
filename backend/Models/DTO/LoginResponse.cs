namespace backend.Models.DTO
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public string Nome { get; set; }
        public string Cognome { get; set; }
        public string Email { get; set; }
        public bool IscrittoAlTorneo { get; set; }
        public bool OrganizzatoreDelTorneo { get; set; }
    }
} 