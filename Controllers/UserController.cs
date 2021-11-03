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

		[HttpGet("email/{emailAttempt}")]
		public ActionResult<bool> ValidateEmail(string emailAttempt)
		{
			// Query db to check if the email input is already connected to an account.
			return DbController.CheckEmail(emailAttempt);
		}

		[HttpPost("login")]
		public ActionResult<User> Login([FromBody] User userAttempt)
		{
			return DbController.CheckUser(userAttempt.Email, userAttempt.UserName, userAttempt.Password);

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

		[HttpGet("user/{id}")]
		public ActionResult<User> GetUser(Guid id)
		{
			User foundUser = DbController.Finduser(id);
			foundUser.Posts = DbController.FindUserPosts(id);

			return foundUser;
		}


		public void CreatePost()
		{
			string query = " INSERT INTO Posts(PostId, Body, PostedById, CreatedAt, UpdatedAt) VALUES(NEWID(), 'i am beyonce always', '694000A0-B77C-4254-94E9-1FD274A54AC1', GETDATE(), GETDATE());";

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
