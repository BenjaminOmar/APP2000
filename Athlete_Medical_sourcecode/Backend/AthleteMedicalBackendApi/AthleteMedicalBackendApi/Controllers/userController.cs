using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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


        // dummy method to check all the users in the database
        [HttpGet("showall")]
        public async Task<IEnumerable<User>> Get()
        {
            return await _context.Users.ToListAsync();
        }

        // authenticates whetever the person logging in is an actual user
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null) // returns null if the user object does not contain anything
            {
                return BadRequest();
            }

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == userObj.Username && x.Password == userObj.Password); // finds the first object with the matching val

            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            return Ok(new { Message = "Login sucsess" }); // if the users username and password are correct, the person will be routed at frontend

        }

        // Creates a new user
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }

            if (await CheckUserNaneExistAsync(userObj.Username))
            {
                return BadRequest(new { Message = "Username already exists" });
            }

            if (await CheckSecurityNumExistAsync(userObj.SocialSecurityNum))
            {
                return BadRequest(new { Message = "Social security number already exists" });
            }

            if (await CheckPhoneNumberExistAsync(userObj.PhoneNumber))
            {
                return BadRequest(new { Message = "Phone number already exists" });
            }

            if (await CheckEmailExistAsync(userObj.Email))
            {
                return BadRequest(new { Message = "Email already exists" });
            }

            var checkPassword = CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(checkPassword))
            {
                return BadRequest(new { Message = checkPassword });
            }

            await _context.Users.AddAsync(userObj); // adds the object
            await _context.SaveChangesAsync(); // stores it in the database
            return Ok(new { Message = "User registered" });
        }

        // methods to check if registered unique values already exists
        private async Task<bool> CheckUserNaneExistAsync(string username)
        {
            return await _context.Users.AnyAsync(x => x.Username == username);
        }

        private async Task<bool> CheckSecurityNumExistAsync(int SecurityNum)
        {
            return await _context.Users.AnyAsync(x => x.SocialSecurityNum == SecurityNum);
        }

        private async Task<bool> CheckPhoneNumberExistAsync(int phoneNumber)
        {
            return await _context.Users.AnyAsync(x => x.PhoneNumber == phoneNumber);
        }

        private async Task<bool> CheckEmailExistAsync(string email) 
        {
            return await _context.Users.AnyAsync(x => x.Email == email);
        }

        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 8)
            {
                sb.Append("Minimum password length should be 8 characters");
            }
            return sb.ToString();
        }
    }
}

