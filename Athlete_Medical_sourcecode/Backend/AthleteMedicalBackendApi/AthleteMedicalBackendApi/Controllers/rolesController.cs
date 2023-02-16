using AthleteMedicalBackendApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AthleteMedicalBackendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class rolesController : Controller
    {
        private readonly App2000Context _context;

        public rolesController(App2000Context context) => _context = context;

        [HttpGet]
        public async Task<IEnumerable<Role>> Get()
        {
            return await _context.Roles.ToListAsync();
        }
    }
}

