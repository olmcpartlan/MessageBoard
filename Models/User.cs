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
		public string LastName { get; set; }
		public Post[] Posts { get; set; }
		public DateTime CreatedAt { get; set; }
		public DateTime UpdatedAt { get; set; }

		public User(string userName, string email, string password, string confirmPassword)
        {
			this.UserId = Guid.NewGuid();
			this.UserName = userName;
			this.Email = email;
			// TODO: Confirm password
			this.Password = password;
			this.Posts = new Post[] { };
        }
		public User(string userName, string firstName, string lastName, string email, string password, string confirmPassword)
        {
			this.UserId = Guid.NewGuid();
			this.UserName = userName;
			this.FirstName = firstName;
			this.LastName = LastName;
			this.Email = email;
			// TODO: Confirm password
			this.Password = password;
			this.Posts = new Post[] { };
        }

	}


}
