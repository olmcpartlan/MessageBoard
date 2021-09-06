using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MessageBoard.Models;

namespace MessageBoard.Controllers
{
	[Route("api/users")]
	[ApiController]
	public class UserController : Controller
	{
		[HttpPost("create")]
		public ActionResult<User> CreateUser()
		{
			User user = new User("", "", "", "");
			return user;
		}

		[HttpGet("email/{emailAttempt}")]
		public ActionResult<bool> ValidateEmail(string emailAttempt)
		{
			// Query db to check if the email input is already connected to an account.
			return DbController.CheckEmail(emailAttempt);
		}

		[HttpPost("login")]
		public ActionResult<User> Login([FromBody] User userAttempt)
		{
			Console.WriteLine();
			return userAttempt;
		}
	}
}
