using System;
using System.Linq;
using MessageBoard.Models;
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
							conn.Close();
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

		// This could be done using templates.. worth it? 
		public static bool InsertUser(User u)
		{

			string emailQuery =
				$@"
					INSERT INTO		Users(UserId, UserName, Pass, Email, CreatedAt, UpdatedAt)
									VALUES(
										'{u.UserId}', '{u.UserName}', 
										'{u.Password}', '{u.Email}', 
										'{u.CreatedAt}', '{u.UpdatedAt}')
				";


			using (conn = new SqlConnection(ConnectionString))
			{
				conn.Open();
				SqlCommand cmd = new SqlCommand(emailQuery, conn);


				try
				{
					conn.Close();
					return Convert.ToBoolean(cmd.ExecuteNonQuery());

				}
				catch (Exception e)
				{
					Console.WriteLine(e.Message);
					return false;
				}


			}

		}

		public static bool UpdateOptionalFields(string firstName, string lastName, Guid userId)
		{

			string updateQuery =  
				$@"UPDATE Users SET FirstName='{firstName}', LastName='{lastName}' WHERE UserId='{userId}'";
			


			using (conn = new SqlConnection(ConnectionString))
			{
				conn.Open();
				SqlCommand cmd = new SqlCommand(updateQuery, conn);


				try
				{
					return Convert.ToBoolean(cmd.ExecuteNonQuery());

				}
				catch (Exception e)
				{
					return false;
				}
			}

		}
		public static User CheckUser(string email, string userName, string pass)
		{
			string selectQuery = "";
			if(email != null)	selectQuery = $"SELECT Pass, UserId, UserName, Email, FirstName, LastName FROM Users WHERE Email='{email}';";
			else				selectQuery = $"SELECT Pass FROM Users WHERE UserName='{userName}'";


			using(conn = new SqlConnection(ConnectionString))
			{
				conn.Open();
				SqlCommand cmd = new SqlCommand(selectQuery, conn);
				try
				{
					SqlDataReader reader = cmd.ExecuteReader();
					while (reader.Read())
					{
						string foundPass = reader.GetString(0);
						// If the query was able to find a user.
						if (!foundPass.Equals(""))
						{
							if(BCrypt.Net.BCrypt.Verify(pass, foundPass))
							{
								return new User(reader.GetString(2), 
									reader.GetString(4), 
									reader.GetString(5), 
									reader.GetString(3), 
									reader.GetGuid(1)
									);
							}
							return new User();
						}
					}

				}
				catch(Exception e)
				{
					Console.WriteLine(e.Message);
					Console.WriteLine();
				}


			}
			return new User();

		}
	}
}
