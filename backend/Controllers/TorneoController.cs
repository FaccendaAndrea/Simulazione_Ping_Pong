using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/torneo")]
    [Authorize]
    public class TorneoController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TorneoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("iscriviti")]
        public async Task<IActionResult> IscrivitiAlTorneo()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound(new { message = "Utente non trovato" });
            if (user.IscrittoAlTorneo)
                return BadRequest(new { message = "Utente già iscritto al torneo" });
            user.IscrittoAlTorneo = true;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Iscrizione al torneo avvenuta" });
        }

        [HttpPost("sono-un-organizzatore")]
        public async Task<IActionResult> DiventaOrganizzatore()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound(new { message = "Utente non trovato" });
            if (user.OrganizzatoreDelTorneo)
                return BadRequest(new { message = "Utente già organizzatore" });
            user.OrganizzatoreDelTorneo = true;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Ora sei organizzatore del torneo" });
        }
    }
} 