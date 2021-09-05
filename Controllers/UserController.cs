using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MessageBoard.Models;

namespace MessageBoard.Controllers
{
	public class UserController : Controller
	{
		[HttpGet("")]
		public ActionResult<string> Index()
		{
			User user = new User("", "", "", "");
			return "index";
		}

		[HttpPost("user")]
		public ActionResult<User> CreateUser()
		{
			User user = new User("", "", "", "");
			return user;
		}
	}
}
