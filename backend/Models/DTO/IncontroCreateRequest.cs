namespace backend.Models.DTO
{
    public class IncontroCreateRequest
    {
        public int PartecipanteAID { get; set; }
        public int PartecipanteBID { get; set; }
        public DateTime Data { get; set; }
    }
} 