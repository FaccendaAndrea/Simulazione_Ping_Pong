using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/partecipanti")]
    [Authorize]
    public class PartecipantiController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PartecipantiController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetPartecipanti()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = await _context.Users.FindAsync(userId);
            if (user == null || !user.IscrittoAlTorneo)
                return Forbid("Solo gli iscritti al torneo possono vedere la lista partecipanti.");

            var partecipanti = await _context.Users
                .Where(u => u.IscrittoAlTorneo)
                .Select(u => new {
                    u.Id,
                    u.Nome,
                    u.Cognome,
                    u.Email,
                    u.OrganizzatoreDelTorneo
                })
                .ToListAsync();

            return Ok(partecipanti);
        }
    }
}
