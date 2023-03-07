using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AthleteMedicalBackendApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace AthleteMedicalBackendApi.Controllers
{
    [Route("api/appointment")]
    [ApiController]
    public class appointmentController : Controller
    {
        private readonly App2000Context _context;

        public appointmentController(App2000Context context) => _context = context;



        // get all appointments
        [HttpGet]
        public async Task<IActionResult> GetAllAppointments()
        {
            try
            {
                var appointments = await _context.Appointments.ToListAsync();

                return Ok(appointments);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error ved visning av alle avtaler");
            }
        }



        // get all available appointments
        [HttpGet("available")]
        public async Task<IActionResult> GetAvailableAppointments()
        {
            try
            {
                var availableAppointments = await _context.Appointments.FromSqlInterpolated<Appointment>($"availableAppointments").ToListAsync();

                return Ok(availableAppointments);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error ved visning av alle ledige avtaler");
            }
        }


        // book an available appointment
        [HttpPut("book")]
        public async Task<IActionResult> BookAvailableAppointments(int appId, int patId)
        {
            try
            {
                var appointment = await _context.Appointments.FirstOrDefaultAsync(x => x.AppointmentId == appId);

                // check if an appointment selected is actually a valid appointment
                if (appointment == null)
                {
                    return NotFound(new { Message = "Valgt er ikke en avtale, som er registrert hos oss" });
                }

                // checks if the appointment is already booked
                if (appointment.IsAvailable == 0)
                {
                    return BadRequest(new { Message = "Denne avtalen er allerede booket" });
                }

                var bookAppointment = await _context.Database.ExecuteSqlInterpolatedAsync($"bookAppointment({patId}, {appId})");

                return Ok(new { Message = "Avtale registrert" });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error ved booking av en time");
            }

        }

        // specialist create an appointment
        [HttpPost("create")]
        public async Task<IActionResult> RegisterAppointment([FromBody] Appointment appointment)
        {
            if (appointment == null)
            {
                return BadRequest(new { Message = "Avtalen ble ikke laget" });
            }

            if (appointment.StartTime < DateTime.Now)
            {
                return BadRequest(new { Message = "Avtalen må være frem i tid" });
            }

            await _context.Appointments.AddAsync(appointment); // adds the object
            await _context.SaveChangesAsync(); // stores it in the database
            return Ok(new { Message = "Avtale er registrert" });
        }


        // get appointment based on appointmentId
        [HttpGet("{AppointmentId}")]
        public async Task<IActionResult> GetAppointment(int AppointmentId)
        {
            try
            {
                var appointment = await _context.Appointments.FindAsync(AppointmentId);

                if (appointment == null)
                {
                    return NotFound();
                }

                return Ok(appointment);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error ved innhenting av denne spesifikke timen");
            }
        }


        // alter appointment based on id
        [HttpPut("{AppointmentId}")]
        public async Task<IActionResult> UpdateAppointment(int AppointmentId, [FromBody] Appointment appointment)
        {
            try
            {
                if (appointment == null || appointment.AppointmentId != AppointmentId)
                {
                    return BadRequest();
                }

                var existingAppointment = await _context.Appointments.FindAsync(AppointmentId);

                if (existingAppointment == null)
                {
                    return NotFound();
                }

                existingAppointment.StartTime = appointment.StartTime;
                existingAppointment.EndTime = appointment.EndTime;

                await _context.SaveChangesAsync();

                return Ok(existingAppointment);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error ved oppdatering av avtale");
            }
        }



        // delete appointment based on Id
        [HttpDelete("{AppointmentId}")]
        public async Task<IActionResult> DeleteAppointment(int AppointmentId)
        {
            try
            {
                var appointment = await _context.Appointments.FindAsync(AppointmentId);

                if (appointment == null)
                {
                    return NotFound();
                }

                _context.Appointments.Remove(appointment);

                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error ved sletting av avtale");
            }
        }
    }
}

