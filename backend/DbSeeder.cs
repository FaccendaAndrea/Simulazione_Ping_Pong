using backend.Models;
using BCrypt.Net;

public static class DbSeeder
{
    public static void Seed(AppDbContext context)
    {
        if (!context.Users.Any())
        {
            var user1 = new User
            {
                Nome = "Mario",
                Cognome = "Rossi",
                Email = "mario.rossi@azienda.it",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password1!"),
                IscrittoAlTorneo = true,
                OrganizzatoreDelTorneo = false
            };
            var user2 = new User
            {
                Nome = "Luca",
                Cognome = "Bianchi",
                Email = "luca.bianchi@azienda.it",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password2!"),
                IscrittoAlTorneo = true,
                OrganizzatoreDelTorneo = true // Organizzatore
            };
            var user3 = new User
            {
                Nome = "Giulia",
                Cognome = "Verdi",
                Email = "giulia.verdi@azienda.it",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password3!"),
                IscrittoAlTorneo = true,
                OrganizzatoreDelTorneo = false
            };

            context.Users.AddRange(user1, user2, user3);
            context.SaveChanges();

            var incontri = new List<Incontro>
            {
                new Incontro
                {
                    Data = DateTime.Now.AddDays(-5),
                    PartecipanteAID = user1.Id,
                    PartecipanteBID = user2.Id,
                    Giocato = true,
                    PuntiA = 11,
                    PuntiB = 8
                },
                new Incontro
                {
                    Data = DateTime.Now.AddDays(-4),
                    PartecipanteAID = user2.Id,
                    PartecipanteBID = user3.Id,
                    Giocato = true,
                    PuntiA = 9,
                    PuntiB = 11
                },
                new Incontro
                {
                    Data = DateTime.Now.AddDays(-3),
                    PartecipanteAID = user1.Id,
                    PartecipanteBID = user3.Id,
                    Giocato = false
                },
                new Incontro
                {
                    Data = DateTime.Now.AddDays(-2),
                    PartecipanteAID = user3.Id,
                    PartecipanteBID = user1.Id,
                    Giocato = false
                },
                new Incontro
                {
                    Data = DateTime.Now.AddDays(-1),
                    PartecipanteAID = user2.Id,
                    PartecipanteBID = user1.Id,
                    Giocato = true,
                    PuntiA = 7,
                    PuntiB = 11
                }
            };

            context.Incontri.AddRange(incontri);
            context.SaveChanges();
        }
    }
} 