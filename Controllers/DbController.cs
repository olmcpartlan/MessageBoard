using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.SqlServer.Server;
using System.Data.SqlClient;

namespace MessageBoard.Controllers
{
	public class DbController
	{
		public static string ConnectionString = "Server=localhost;Database=MessageBoard;Trusted_Connection=True;";

		public static SqlConnection conn;
		public static bool CheckEmail(string email)
		{
			string emailQuery = "SELECT email FROM dbo.Users;";

			using (conn = new SqlConnection(ConnectionString))
			{
				conn.Open();
				SqlCommand cmd = new SqlCommand(emailQuery, conn);



				SqlDataReader reader = cmd.ExecuteReader();
				while(reader.Read())
				{
					string foundEmail = reader.GetString(0);
					Console.WriteLine();
				}


			}

			return false;

		}
	}
}
