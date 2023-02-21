using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AthleteMedicalBackendApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AthleteMedicalBackendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class roomController : Controller
    {
        private readonly App2000Context _context;

        public roomController(App2000Context context) => _context = context;


        [HttpGet]
        public async Task<IEnumerable<Room>> Get()
        {
            return await _context.Rooms.ToListAsync();
        }

        // POST api/values
        [HttpPost ("createRoom")]
        public async Task<ActionResult<Room>> CreateRoom([FromBody] Room roomObj)
        {
            try
            {
                if (roomObj == null)
                    return BadRequest();
                var room = await _context.Rooms.AddAsync(roomObj);
                await _context.SaveChangesAsync();
                return Ok(new { Message = "Room registered" });
            }
            catch(Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                            "Error creating new employee record");
            }

        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoom(int id, [FromBody] Room roomObj)
        {
            try
            {
                var existingRoom = await _context.Rooms.FindAsync(id);

                if (existingRoom == null)
                {
                    return NotFound();
                }

                existingRoom.RoomId = roomObj.RoomId;
                existingRoom.RoomName = roomObj.RoomName;
                existingRoom.Seats = roomObj.Seats;

                _context.Entry(existingRoom).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return Ok(existingRoom);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating room record");
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            try
            {
                var existingRoom = await _context.Rooms.FindAsync(id);

                if (existingRoom == null)
                {
                    return NotFound();
                }

                _context.Rooms.Remove(existingRoom);

                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting room record");
            }
        }

    }
}
