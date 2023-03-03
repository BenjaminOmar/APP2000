using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AthleteMedicalBackendApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AthleteMedicalBackendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class appointmentController : Controller
    {
        private readonly App2000Context _context;

        public appointmentController(App2000Context context) => _context = context;

        // GET: api/values
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
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving appointments from database");
            }
        }

        // availableAppointments
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
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving available appointments from database");
            }
        }

        // GET api/values/5
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
                    "Error retrieving appointment record");
            }
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> CreateAppointment([FromBody] Appointment appointment)
        {
            try
            {
                if (appointment == null)
                {
                    return BadRequest();
                }

                _context.Appointments.Add(appointment);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetAppointment), new { id = appointment.AppointmentId }, appointment);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating appointment record");
            }
        }


        // PUT api/values/5
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
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating appointment record");
            }
        }

        // DELETE api/values/5
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
                    "Error deleting appointment record");
            }
        }
    }
}

