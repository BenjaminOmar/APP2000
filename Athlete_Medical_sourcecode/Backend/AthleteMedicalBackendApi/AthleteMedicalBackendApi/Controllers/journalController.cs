using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AthleteMedicalBackendApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AthleteMedicalBackendApi.Controllers
{
    [Route("api/journal")]
    [ApiController]
    public class journalController : Controller
    {
        private readonly App2000Context _context;

        public journalController(App2000Context context) => _context = context;

        // get all journals
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllJournals()
        {
            var journals = await _context.Journalnotes.ToListAsync();

            return Ok(journals);
        }

        // GET api/values/5
        [HttpGet("byId")]
        public async Task<IActionResult> GetJournal(int journalId)
        {
            var journal = await _context.Journalnotes.FindAsync(journalId);

            if (journal == null)
            {
                return NotFound(new { Message = "Valgte journal finnes ikke" });
            }

            return Ok(journal);
        }

        [HttpPost("create")]
        public async Task<IActionResult> RegisterAppointment([FromBody] Journalnote journal)
        {
            if (journal == null)
            {
                return BadRequest(new { Message = "Avtalen ble ikke laget" });
            }

            var patient = await _context.Users.FindAsync(journal.Patient);

            if (patient == null)
            {
                return NotFound(new { Message = "Valgt pasient finnes ikke" });
            }

            await _context.Journalnotes.AddAsync(journal); // adds the object
            await _context.SaveChangesAsync(); // stores it in the database
            return Ok(new { Message = "Journalnotat er registrert" });
        }


        [HttpPut("update")]
        public async Task<IActionResult> UpdateAppointment([FromBody] Journalnote journalnote)
        {
            try
            {

                var journalnoteId = await _context.Journalnotes.FirstOrDefaultAsync(x => x.JournalnoteId == journalnote.JournalnoteId);
                if (journalnoteId == null)
                {
                    return NotFound(new { Message = "valgt Journalnotat finnes ikke" });
                }

                var existingJournalnote = await _context.Journalnotes.FindAsync(journalnote.JournalnoteId);

                if (existingJournalnote == null)
                {
                    return NotFound(new { Message = "Valgte notat finnes ikke hos oss" });
                }

                var patient = await _context.Users.FindAsync(journalnote.Patient);

                if (patient == null)
                {
                    return NotFound(new { Message = "Valgt pasient finnes ikke" });
                }


                await _context.Database.ExecuteSqlInterpolatedAsync($"alterJournalNote({journalnote.JournalnoteId},{journalnote.Journalnote1},{journalnote.Heading},{journalnote.Created},{journalnote.Patient})");

                return Ok(new { Message = "Journal er endret" });

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error ved oppdatering av avtale");
            }
        }


        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteAppointment(int journalId)
        {
            try
            {
                var journal = await _context.Journalnotes.FindAsync(journalId);

                if (journal == null)
                {
                    return NotFound();
                }

                _context.Journalnotes.Remove(journal);

                await _context.SaveChangesAsync();

                return Ok(new { Message = "Journalnotat er slettet" });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error ved sletting av avtale");
            }
        }
    }
}

