using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.Models.DTO;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/incontri")]
    [Authorize]
    public class IncontriController : ControllerBase
    {
        private readonly AppDbContext _context;
        public IncontriController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetIncontri()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = await _context.Users.FindAsync(userId);
            if (user == null || !user.IscrittoAlTorneo)
                return Forbid("Solo gli iscritti al torneo possono vedere gli incontri.");

            var incontri = await _context.Incontri
                .Include(i => i.PartecipanteA)
                .Include(i => i.PartecipanteB)
                .OrderBy(i => i.Data)
                .Select(i => new {
                    i.IncontroID,
                    i.Data,
                    PartecipanteA = new { i.PartecipanteA.Id, i.PartecipanteA.Nome, i.PartecipanteA.Cognome },
                    PartecipanteB = new { i.PartecipanteB.Id, i.PartecipanteB.Nome, i.PartecipanteB.Cognome },
                    i.Giocato,
                    i.PuntiA,
                    i.PuntiB
                })
                .ToListAsync();

            return Ok(incontri);
        }

        [HttpPost]
        public async Task<IActionResult> CreaIncontro([FromBody] IncontroCreateRequest dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = await _context.Users.FindAsync(userId);
            if (user == null || !user.OrganizzatoreDelTorneo)
                return Forbid("Solo gli organizzatori possono creare incontri.");
            if (dto.PartecipanteAID == dto.PartecipanteBID)
                return BadRequest(new { message = "I due partecipanti devono essere diversi." });
            var partecipanteA = await _context.Users.FindAsync(dto.PartecipanteAID);
            var partecipanteB = await _context.Users.FindAsync(dto.PartecipanteBID);
            if (partecipanteA == null || partecipanteB == null || !partecipanteA.IscrittoAlTorneo || !partecipanteB.IscrittoAlTorneo)
                return BadRequest(new { message = "Entrambi i partecipanti devono essere iscritti al torneo." });
            var incontro = new Incontro
            {
                PartecipanteAID = dto.PartecipanteAID,
                PartecipanteBID = dto.PartecipanteBID,
                Data = dto.Data,
                Giocato = false
            };
            _context.Incontri.Add(incontro);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Incontro creato", incontro.IncontroID });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AggiornaIncontro(int id, [FromBody] IncontroUpdateRequest dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = await _context.Users.FindAsync(userId);
            if (user == null || !user.OrganizzatoreDelTorneo)
                return Forbid("Solo gli organizzatori possono modificare gli incontri.");
            var incontro = await _context.Incontri.FindAsync(id);
            if (incontro == null)
                return NotFound(new { message = "Incontro non trovato" });
            // Validazione punteggio secondo regole
            if (dto.Giocato)
            {
                if (dto.PuntiA == null || dto.PuntiB == null)
                    return BadRequest(new { message = "Punteggi obbligatori se la partita è giocata." });
                if (dto.PuntiA == dto.PuntiB)
                    return BadRequest(new { message = "Non sono ammessi pareggi." });
                if (dto.PuntiA < 0 || dto.PuntiB < 0)
                    return BadRequest(new { message = "I punteggi devono essere positivi." });
                int max = Math.Max(dto.PuntiA.Value, dto.PuntiB.Value);
                int min = Math.Min(dto.PuntiA.Value, dto.PuntiB.Value);
                if (max < 11)
                    return BadRequest(new { message = "Per vincere servono almeno 11 punti." });
                if (max - min < 2)
                    return BadRequest(new { message = "Il vincitore deve avere almeno 2 punti di vantaggio." });
                if (max > 11 && max - min != 2)
                    return BadRequest(new { message = "Dopo il 10-10 si vince solo con 2 punti di scarto." });
            }
            incontro.PuntiA = dto.PuntiA;
            incontro.PuntiB = dto.PuntiB;
            incontro.Giocato = dto.Giocato;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Incontro aggiornato" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminaIncontro(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = await _context.Users.FindAsync(userId);
            if (user == null || !user.OrganizzatoreDelTorneo)
                return Forbid("Solo gli organizzatori possono eliminare gli incontri.");
            var incontro = await _context.Incontri.FindAsync(id);
            if (incontro == null)
                return NotFound(new { message = "Incontro non trovato" });
            _context.Incontri.Remove(incontro);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Incontro eliminato" });
        }
    }
} 