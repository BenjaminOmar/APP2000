using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AthleteMedicalBackendApi.Entities;
using Google.Protobuf.WellKnownTypes;
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
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllAppointments()
        {
            try
            {
                var appointments = await _context.AppointmentsGetAll.FromSqlInterpolated<AppointmentGetAll>($"getAll").ToListAsync();

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

        // get all available appointments by specialistId
        [HttpGet("available/specId")]
        public async Task<IActionResult> GetAvailableAppointmentsBySpecId(int specId)
        {
            try
            {
                var availableAppointments = await _context.Appointments.FromSqlInterpolated<Appointment>($"availableAppointmentsbySpecId({specId})").ToListAsync();

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

                await _context.Database.ExecuteSqlInterpolatedAsync($"bookAppointment({appId},{patId})");

                return Ok(new { Message = "Avtale registrert" });
        }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
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

            appointment.IsAvailable = 1;

            await _context.Appointments.AddAsync(appointment); // adds the object
            await _context.SaveChangesAsync(); // stores it in the database
            return Ok(new { Message = "Avtale er registrert" });
        }


        // get appointment based on appointmentId
        [HttpGet("byAppointmentId")]
        public async Task<IActionResult> GetAppointmentByAppId(int AppointmentId)
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

        // get appointment based on userId
        [HttpGet("byUserId")]
        public async Task<IActionResult> GetAppointmentByUserId(int UserId)
        {
            try
            {
                var user = await _context.AppointmentGetByIds.FromSqlInterpolated<AppointmentGetById>($"appointmentByUserId({UserId})").ToListAsync();

                if (user == null)
                {
                    return NotFound();
                }

                return Ok(user);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error ved innhenting av denne spesifikke timen");
            }
        }


        // alter appointment based on id
        [HttpPut("update")]
        public async Task<IActionResult> UpdateAppointment([FromBody] Appointment appointment)
        {
            try
            {

                var appointmentId = await _context.Appointments.FirstOrDefaultAsync(x => x.AppointmentId == appointment.AppointmentId);
                if (appointment == null)
                {
                    return BadRequest();
                }

                var existingAppointment = await _context.Appointments.FindAsync(appointment.AppointmentId);

                if (existingAppointment == null)
                {
                    return NotFound(new { Message = "Valgte avtale er ikke en avtale hos oss" });
                }

                var room = await _context.Rooms.FindAsync(appointment.RoomId);

                if (room == null)
                {
                    return NotFound(new { Message = "Dette romnummeret finnes ikke" });
                }

                var patient = await _context.Users.FindAsync(appointment.PatientId);

                if (patient == null)
                {
                    return NotFound(new { Message = "Valgt pasient finnes ikke" });
                }

                var specialist = await _context.Users.FindAsync(appointment.SpecialistId);

                if (specialist == null)
                {
                    return NotFound(new { Message = "valgt spesialist finnes ikke" });
                }


                await _context.Database.ExecuteSqlInterpolatedAsync($"alterAppointment({appointment.AppointmentId},{appointment.StartTime},{appointment.EndTime},{appointment.RoomId},{appointment.PatientId},{appointment.SpecialistId},{appointment.IsAvailable})");

                return Ok(new { Message = "Avtale er endret" });

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error ved oppdatering av avtale");
            }
        }



        // delete appointment based on Id
        [HttpDelete("delete")]
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

