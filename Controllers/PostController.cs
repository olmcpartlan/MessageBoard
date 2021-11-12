using System;
using System.Linq;
using MessageBoard.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;



namespace MessageBoard.Controllers
{
	public class PostController : Controller
	{
		[HttpPost("posts")]
		public ActionResult<string> InsertPost()
		{
			string query = " INSERT INTO Posts(PostId, Body, PostedById, CreatedAt, UpdatedAt) VALUES(NEWID(), 'i am beyonce always', '694000A0-B77C-4254-94E9-1FD274A54AC1', GETDATE(), GETDATE());";

			return query;

		}

		// Runs onload of the user profile page. select * from posts where userid = id
		[HttpGet("user/{id}")]
		public ActionResult<User> GetUser(Guid id)
		{
			User foundUser = Models.User.Finduser(id);
			foundUser.Posts = Post.GetUserPosts(id);

			return foundUser;
		}

		[HttpGet("posts")]
		public ActionResult<Post[]> GetAllPosts()
		{
			Post[] posts = Post.GetAllPosts();


			return posts;
		}

	}
}
