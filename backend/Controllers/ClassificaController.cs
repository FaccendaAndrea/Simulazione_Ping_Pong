using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/classifica")]
    [Authorize]
    public class ClassificaController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ClassificaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetClassifica()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = await _context.Users.FindAsync(userId);
            if (user == null || !user.IscrittoAlTorneo)
                return Forbid("Solo gli iscritti al torneo possono vedere la classifica.");

            var partecipanti = await _context.Users
                .Where(u => u.IscrittoAlTorneo)
                .Select(u => new
                {
                    u.Id,
                    u.Nome,
                    u.Cognome,
                    Giocate = _context.Incontri.Count(i => (i.PartecipanteAID == u.Id || i.PartecipanteBID == u.Id) && i.Giocato),
                    Vinte = _context.Incontri.Count(i => i.Giocato && ((i.PartecipanteAID == u.Id && i.PuntiA > i.PuntiB) || (i.PartecipanteBID == u.Id && i.PuntiB > i.PuntiA)))
                })
                .ToListAsync();

            var classifica = partecipanti
                .Select(p => new
                {
                    p.Id,
                    p.Nome,
                    p.Cognome,
                    Giocate = p.Giocate,
                    Vinte = p.Vinte,
                    PercentualeVittorie = p.Giocate > 0 ? (double)p.Vinte / p.Giocate * 100 : 0
                })
                .OrderByDescending(p => p.Giocate >= 5 ? p.PercentualeVittorie : -1)
                .ThenByDescending(p => p.Giocate >= 5)
                .ThenBy(p => p.Nome)
                .ToList();

            return Ok(classifica);
        }
    }
} 