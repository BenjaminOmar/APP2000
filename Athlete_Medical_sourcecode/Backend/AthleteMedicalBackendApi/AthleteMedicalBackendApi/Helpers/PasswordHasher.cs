using System;
using System.Security.Cryptography;
using System.Text;

namespace AthleteMedicalBackendApi.Helpers
{
	public class PasswordHasher
	{
		public static string HashPassword(string password) // method for hashing the password
		{
			SHA256 hash = SHA256.Create();
			var bytesPassword = Encoding.Default.GetBytes(password);
			var hashedPassword = hash.ComputeHash(bytesPassword);
			return Convert.ToHexString(hashedPassword);
		}

    }
}
