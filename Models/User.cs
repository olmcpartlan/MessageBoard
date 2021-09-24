using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MessageBoard.Models
{
	public class User
	{
		public Guid UserId { get; set; }
		public string UserName { get; set; }
		public string Password { get; set; }
		public string Email { get; set; }
		public string FirstName { get; set; }
		public string Image { get; set; }
		public string LastName { get; set; }
		public Post[] Posts { get; set; }
		public DateTime CreatedAt { get; set; }
		public DateTime UpdatedAt { get; set; }

		public User() { }
		public User(string userName, string email, string password)
		{
			this.UserId = Guid.NewGuid();
			this.UserName = userName;
			this.Email = email;
			// TODO: Confirm password
			this.Password = password;
			this.Posts = new Post[] { };
		}

		// Used to set the user fields after the login matches.
		public User(string userName, string firstName, string lastName, string email, Guid userId)
		{
			this.UserId = userId;
			this.UserName = userName;
			this.FirstName = firstName;
			this.LastName = lastName;
			this.Email = email;
			this.Posts = new Post[] { };
		}

		// User login method.
		public User(string userName, string pass)
		{
			// TODO: all the validation lmao
		}

		public static string EncryptUserPass(string pass)
		{
			return BCrypt.Net.BCrypt.HashPassword(pass);
		}
		public static bool ValidateUserPass(string passAttempt, string passHash)
		{
			return  BCrypt.Net.BCrypt.Verify(passAttempt, passHash);
		}

	}


}
