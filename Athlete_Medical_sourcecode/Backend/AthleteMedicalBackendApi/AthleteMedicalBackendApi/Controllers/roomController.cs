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


        [HttpGet("getAll")]
        public async Task<IEnumerable<Room>> Get()
        {
            return await _context.Rooms.ToListAsync();
        }

    }
}
