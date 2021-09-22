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
			return userAttempt;
		}

		[HttpPost("register")]
		public ActionResult<User> Register([FromBody] User userFields)
		{
			User StagedUser = new User()
			{
				UserId = Guid.NewGuid(),
				UserName = userFields.UserName,
				Email = userFields.Email,
				Password = Models.User.EncryptUserPass(userFields.Password),
				CreatedAt = DateTime.Now,
				UpdatedAt = DateTime.Now,
			};
			
			if(DbController.InsertUser(StagedUser)) return StagedUser;

			return new User()
			{
				UserName = "an error occurred"
			};
		}

		[HttpPost("upload")]
		public ActionResult<bool> UploadImage([FromBody] object file)
		{

			Console.WriteLine();

			return true;
		}

		[HttpPost("optional")]
		public ActionResult<bool> OptionalFields([FromBody] User user)
		{
			// Append the optional fields to the new user.
			return DbController.UpdateOptionalFields(user.FirstName, user.LastName, user.UserId);
		}
	}
}
