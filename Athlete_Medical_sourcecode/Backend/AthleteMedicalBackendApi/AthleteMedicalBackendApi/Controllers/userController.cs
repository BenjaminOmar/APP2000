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
    [Route("api/user")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly App2000Context _context;

        public UserController(App2000Context app2000Context)
        {
            _context = app2000Context;
        }
        // gets all users
        [HttpGet("getAll")]
        public async Task<IEnumerable<User>> Get()
        {
            return await _context.Users.ToListAsync();
        }

        // gets all users that are specialists
        [HttpGet("specialists")]
        public async Task<IActionResult> GetSpecialists()
        {
            try
            {
                var specialists = await _context.Users.FromSqlInterpolated<User>($"specialists").ToListAsync();

                return Ok(specialists);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // get all users that are patients
        [HttpGet("patients")]
        public async Task<IActionResult> GetPatients()
        {
            try
            {
                var patients = await _context.Users.FromSqlInterpolated<User>($"patients").ToListAsync();

                return Ok(patients);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // update a user based on userId
        [HttpPut("update")]
        public async Task<IActionResult> UpdateAppointment([FromBody] User user)
        {
            try
            {

                var userId = await _context.Users.FirstOrDefaultAsync(x => x.UserId == user.UserId);
                if (userId == null)
                {
                    return NotFound(new { Message = "valgt bruker finnes ikke" });
                }

                if (await CheckUserNaneExistAsync(user.Username))
                {
                    return BadRequest(new { Message = "Brukernavn finnes fra før av" });
                }

                var checkUsername = CheckUsernameStrength(user.Username);
                if (!string.IsNullOrEmpty(checkUsername))
                {
                    return BadRequest(new { Message = checkUsername });
                }

                var checkSsn = CheckSsnStrength(user.SocialSecurityNum!);
                if (!string.IsNullOrEmpty(checkSsn))
                {
                    return BadRequest(new { Message = checkSsn });
                }

                var checkZip = CheckZipStrength(user.ZipCode.ToString());
                if (!string.IsNullOrEmpty(checkZip))
                {
                    return BadRequest(new { Message = checkZip });
                }

                var checkPassword = CheckPasswordStrength(user.Password);
                if (!string.IsNullOrEmpty(checkPassword))
                {
                    return BadRequest(new { Message = checkPassword });
                }

                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

                await _context.Database.ExecuteSqlInterpolatedAsync($"alterUser({user.UserId},{user.FirstName},{user.MiddleName},{user.LastName},{user.PhoneNumber},{user.SocialSecurityNum},{user.Adress},{user.ZipCode},{user.RoleId},{user.Password},{user.Username},{user.Email})");

                return Ok(new { Message = "Bruker er endret" });

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error ved oppdatering av journal");
            }
        }

        // authenticates whetever the person logging in is an actual user
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null) // returns null if the user object does not contain anything
            {
                return BadRequest(new { Message = "Bruker ikke funnet" });
            }

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == userObj.Username); // finds the first object with the matching val   


            if (user == null)
            {
                return NotFound(new { Message = "Bruker ikke funnet" });
            }

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(userObj.Password, user!.Password);

            if (!isValidPassword)
            {
                return NotFound(new { Message = "Bruker ikke funnet" });
            }

            var roleId = user.RoleId;

            return Ok(new { Message = "vellykket innlogging", roleId }); // if the users username and password are correct, the person will be routed at frontend

        }

        // Creates a new user on register
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest(new { Message = "Registeringen ble ikke sendt" });
            }

            if (await CheckUserNaneExistAsync(userObj.Username))
            {
                return BadRequest(new { Message = "Brukernavn finnes fra før av" });
            }

            if (await CheckSecurityNumExistAsync(userObj.SocialSecurityNum!))
            {
                return BadRequest(new { Message = "Personnummer finnes allerede fra før av" });
            }

            if (await CheckPhoneNumberExistAsync(userObj.PhoneNumber))
            {
                return BadRequest(new { Message = "Telefonnummer finnes allerede fra før av" });
            }

            if (await CheckEmailExistAsync(userObj.Email!))
            {
                return BadRequest(new { Message = "Mail finnes allerede fra før av" });
            }

            var checkUsername = CheckUsernameStrength(userObj.Username);
            if (!string.IsNullOrEmpty(checkUsername))
            {
                return BadRequest(new { Message = checkUsername });
            }

            var checkSsn = CheckSsnStrength(userObj.SocialSecurityNum!);
            if (!string.IsNullOrEmpty(checkSsn))
            {
                return BadRequest(new { Message = checkSsn });
            }

            var checkZip = CheckZipStrength(userObj.ZipCode.ToString());
            if (!string.IsNullOrEmpty(checkZip))
            {
                return BadRequest(new { Message = checkZip });
            }

            var checkPassword = CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(checkPassword))
            {
                return BadRequest(new { Message = checkPassword });
            }


            userObj.RoleId = 1;

            userObj.Password = BCrypt.Net.BCrypt.HashPassword(userObj.Password);

            await _context.Users.AddAsync(userObj); // adds the object
            await _context.SaveChangesAsync(); // stores it in the database
            return Ok(new { Message = "Bruker registrert" });
        }

        // Creates a new user on register
        [HttpPost("registerwithroles")]
        public async Task<IActionResult> RegisterSpecialsOrAdmin([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest(new { Message = "Registeringen ble ikke sendt" });
            }

            if (await CheckUserNaneExistAsync(userObj.Username))
            {
                return BadRequest(new { Message = "Brukernavn finnes fra før av" });
            }

            if (await CheckSecurityNumExistAsync(userObj.SocialSecurityNum!))
            {
                return BadRequest(new { Message = "Personnummer finnes allerede fra før av" });
            }

            if (await CheckPhoneNumberExistAsync(userObj.PhoneNumber))
            {
                return BadRequest(new { Message = "Telefonnummer finnes allerede fra før av" });
            }

            if (await CheckEmailExistAsync(userObj.Email!))
            {
                return BadRequest(new { Message = "Mail finnes allerede fra før av" });
            }

            var checkUsername = CheckUsernameStrength(userObj.Username);
            if (!string.IsNullOrEmpty(checkUsername))
            {
                return BadRequest(new { Message = checkUsername });
            }

            var checkSsn = CheckSsnStrength(userObj.SocialSecurityNum!);
            if (!string.IsNullOrEmpty(checkSsn))
            {
                return BadRequest(new { Message = checkSsn });
            }

            var checkZip = CheckZipStrength(userObj.ZipCode.ToString());
            if (!string.IsNullOrEmpty(checkZip))
            {
                return BadRequest(new { Message = checkZip });
            }

            var checkPassword = CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(checkPassword))
            {
                return BadRequest(new { Message = checkPassword });
            }


            userObj.Password = BCrypt.Net.BCrypt.HashPassword(userObj.Password);

            await _context.Users.AddAsync(userObj); // adds the object
            await _context.SaveChangesAsync(); // stores it in the database
            return Ok(new { Message = "Bruker registrert" });
        }


        // methods to check if registered unique values already exists
        private async Task<bool> CheckUserNaneExistAsync(string username)
        {
            return await _context.Users.AnyAsync(x => x.Username == username);
        }

        private async Task<bool> CheckSecurityNumExistAsync(string SecurityNum)
        {
            return await _context.Users.AnyAsync(x => x.SocialSecurityNum!.Equals(SecurityNum));
        }

        private async Task<bool> CheckPhoneNumberExistAsync(int phoneNumber)
        {
            return await _context.Users.AnyAsync(x => x.PhoneNumber == phoneNumber);
        }

        private async Task<bool> CheckEmailExistAsync(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email);
        }

        /* checks if the password:
           - is has 8 or more characters
           - contains an alphanumerical character
           - contains a number
        */
        private static string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();

            if (!password.Any(c => char.IsLetter(c)))
            {
                sb.Append("Passord må inneholde en alphanumerisk karakter");
            }

            if (!password.Any(c => char.IsDigit(c)))
            {
                sb.Clear();
                sb.Append("Passord må inneholde et tall");
            }

            if (password.Length < 8)
            {
                sb.Clear();
                sb.Append("Minimum passord lengde må være på 8 tegn");
            }

            return sb.ToString();
        }

        /* checks if the username:
            - has 5 or more characters
            - Does not have any white spaces
        */
        private static string CheckUsernameStrength(string username)
        {
            StringBuilder sb = new StringBuilder();

            if (username.Any(c => char.IsWhiteSpace(c)))
            {
                sb.Append("Brukernavn kan ikke inneholde mellomrom");
            }

            if (username.Length < 5)
            {
                sb.Clear();
                sb.Append("Minimum brukernavn lengde er 5 karakterer");
            }

            return sb.ToString();
        }

        /* checks if the snn:
            - has 11 characters
            - is all digit
        */
        private static string CheckSsnStrength(string Ssn)
        {
            StringBuilder sb = new StringBuilder();

            if (Ssn.Length != 11)
            {
                sb.Append("Personnummer må være 11 karakterer");
            }

            if (!Ssn.All(char.IsDigit))
            {
                sb.Clear();
                sb.Append("Et personnummer kan bare inneholde tall");
            }

            return sb.ToString();
        }

        /* checks if the zipcode:
            - has 4 characters
        */
        private static string CheckZipStrength(string zip)
        {
            StringBuilder sb = new StringBuilder();

            if (zip.Length != 4)
            {
                sb.Append("Postnummer må være 4 siffer");
            }

            return sb.ToString();
        }

    }
}

