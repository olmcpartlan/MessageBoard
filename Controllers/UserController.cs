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
			return "index";
		}

		[HttpPost("user")]
		public ActionResult<User> CreateUser()
		{

			return new User()
			{

			};
		}
	}
}
