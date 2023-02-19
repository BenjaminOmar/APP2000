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
    public class UserController : Controller
    {
        private readonly App2000Context _context;

        public UserController(App2000Context app2000Context)
        {
            _context = app2000Context;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == userObj.Username && x.Password == userObj.Password);

            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            return Ok(new { Message = "Login sucsess" });

        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }

            await _context.Users.AddAsync(userObj);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "User registered" });
        }
    }
}

