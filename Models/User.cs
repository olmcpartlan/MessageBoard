using System;
using System.Linq;
using MessageBoard.Models;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Collections.Generic;

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
		public DateTime? CreatedAt { get; set; }
		public DateTime? UpdatedAt { get; set; }

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

		public static string EncryptUserPass(string pass)
		{
			return BCrypt.Net.BCrypt.HashPassword(pass);
		}
		public static bool ValidateUserPass(string passAttempt, string passHash)
		{
			return BCrypt.Net.BCrypt.Verify(passAttempt, passHash);
		}



		static string ConnectionString = "Server=localhost;Database=MessageBoard;Trusted_Connection=True;";

		static SqlConnection conn;
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
						if (!foundEmail.Equals(""))
						{
							return true;
						}
					}

				}
				catch
				{
					Console.WriteLine("error");
				}

				finally
				{
					conn.Close();
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
					return Convert.ToBoolean(cmd.ExecuteNonQuery());

				}
				catch (Exception e)
				{
					Console.WriteLine(e.Message);
					return false;
				}
				finally
				{
					conn.Close();

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
				finally
				{
					conn.Close();

				}
			}

		}
		public static User CheckUser(string email, string userName, string pass)
		{
			string selectQuery = "";
			// In the frontend, the user can choose if they want to login with email / username
			// Determined by input.includes("@")
			if (email != null) selectQuery = $"SELECT Pass, UserId, UserName, Email, FirstName, LastName FROM Users WHERE Email='{email}';";
			else selectQuery = $"SELECT Pass, UserId, UserName, Email, FirstName, LastName FROM Users WHERE UserName='{userName}'";


			using (conn = new SqlConnection(ConnectionString))
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
							if (BCrypt.Net.BCrypt.Verify(pass, foundPass))
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
				catch (Exception e)
				{
					Console.WriteLine(e.Message);
					Console.WriteLine();
				}
				finally
				{
					conn.Close();
				}


			}
			return new User();

		}

		public static User Finduser(Guid id)
		{
			string selectQuery = @$"SELECT 
										UserId, 
										UserName,
										Email,
										FirstName,
										LastName,
										CreatedAt, 
										UpdatedAt,
									FROM users WHERE UserId='{id}'";


			using (conn = new SqlConnection(ConnectionString))
			{
				conn.Open();
				SqlCommand cmd = new SqlCommand(selectQuery, conn);
				try
				{
					SqlDataReader reader = cmd.ExecuteReader();

					User user = new User()
					{
						UserId = reader.IsDBNull(0) ? new Guid() : reader.GetGuid(0),
						UserName = reader.IsDBNull(1) ? "" : reader.GetString(1),
						Email = reader.IsDBNull(2) ? "" : reader.GetString(3),
						FirstName = reader.IsDBNull(3) ? "" : reader.GetString(4),

						LastName = reader.IsDBNull(4) ? "" : reader.GetString(5),

						CreatedAt = reader.IsDBNull(5) ? null : (DateTime?)reader.GetDateTime(6),

						// TODO: going to need to add posts here sometime soon.
						UpdatedAt = reader.IsDBNull(6) ? null : (DateTime?)reader.GetDateTime(7),

					};

					Console.WriteLine();

					return user;

				}

				catch (Exception e)
				{
					Console.WriteLine(e.Message);
					Console.WriteLine();
				}
				finally
				{
					conn.Close();
				}

				return new User();


			}

		}


	}


}
