using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AthleteMedicalBackendApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AthleteMedicalBackendApi.Controllers
{
    [Route("api/city")]
    [ApiController]
    public class CityController : Controller
    {
        private readonly App2000Context _context;

        public CityController(App2000Context context) => _context = context;

        [HttpPost("get")]
        public async Task<IActionResult> GetCityBasedOnZip([FromBody] City city)
        {
            var getCity = await _context.Cities.FirstOrDefaultAsync(x => x.ZipCode == city.ZipCode);

            if (getCity == null)
            {
                return BadRequest(new { Message = "Ugyldig postnummer" });
            }
            else
            {
                return Ok(new { getCity.CityName});
            }
        }
    }
}

