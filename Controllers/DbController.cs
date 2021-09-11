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
		/// <summary>
		/// Might implement this in the future, but don't want to deal with event hooks rn.
		/// </summary>
		/// <param name="email"></param>
		/// <returns></returns>
		public static bool CheckEmail(string email)
		{
			string emailQuery = $"SELECT email FROM dbo.Users WHERE email='{email}';";

			using (conn = new SqlConnection(ConnectionString))
			{
				conn.Open();
				SqlCommand cmd = new SqlCommand(emailQuery, conn);


				try
				{
					SqlDataReader reader = cmd.ExecuteReader();
					while (reader.Read())
					{
						string foundEmail = reader.GetString(0);
						if(!foundEmail.Equals(""))
						{
							return true;
						}
					}

				}
				catch
				{
					Console.WriteLine("error");
				}


			}

			return false;

		}
	}
}
