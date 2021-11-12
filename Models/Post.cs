using System;
using System.Linq;
using MessageBoard.Models;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Collections.Generic;


namespace MessageBoard.Models
{
	public class Post
	{
		public Guid PostId { get; set; }
		public Guid PostedById { get; set; }
		public string PostedByName { get; set; }

		public string Body { get; set; }
		public Comment[] Comments { get; set; }
		public DateTime CreatedAt { get; set; }
		public DateTime UpdatedAt { get; set; }


		public Post() { }


		readonly static string ConnectionString = "Server=localhost;Database=MessageBoard;Trusted_Connection=True;";

		static SqlConnection conn;

		public static Post[] GetAllPosts()
		{
			string query = @$"
			SELECT		p.PostId, 
						p.PostedById AS UserID,  
						u.FirstName AS PostedBy,
						p.Body, 
						p.CreatedAt
			FROM		posts p 
			JOIN		Users u		on p.PostedById = u.UserId;
";

			using (conn = new SqlConnection(ConnectionString))
			{
				conn.Open();
				List<Post> foundPosts = new List<Post>();
				SqlCommand cmd = new SqlCommand(query, conn);
				try
				{
					SqlDataReader reader = cmd.ExecuteReader();
					while (reader.Read())
					{


						foundPosts.Add(new Post()
						{
							PostId = reader.GetGuid(0) == null ? new Guid() : reader.GetGuid(0),
							PostedById = reader.GetGuid(1) == null ? new Guid() : reader.GetGuid(1),
							PostedByName = reader.GetString(2) == "" ? null : reader.GetString(2),
							Body = reader.GetString(3) == "" ? null : reader.GetString(3),
							CreatedAt = reader.GetDateTime(4),
						});
					}

					return foundPosts.ToArray();

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

				return new Post[] { };


			}

		}
		public static Post[] GetUserPosts(Guid id)
		{
			string query = $"SELECT PostId, Body, PostedById, CreatedAt, UpdatedAt FROM Posts WHERE PostedById='{id}'";
			using (conn = new SqlConnection(ConnectionString))
			{
				conn.Open();
				List<Post> foundPosts = new List<Post>();
				SqlCommand cmd = new SqlCommand(query, conn);
				try
				{
					SqlDataReader reader = cmd.ExecuteReader();
					while (reader.Read())
					{
						foundPosts.Add(new Post()
						{
							PostId = reader.GetGuid(0) == null ? new Guid() : reader.GetGuid(0),
							Body = reader.GetString(1) == "" ? null : reader.GetString(1),
							PostedById = reader.GetGuid(2) == null ? new Guid() : reader.GetGuid(2),
							CreatedAt = reader.GetDateTime(3),
							UpdatedAt = reader.GetDateTime(4),

						});
					}

					return foundPosts.ToArray();

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

				return new Post[] { };


			}

		}


	}

}
