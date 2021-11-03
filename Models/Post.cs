using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MessageBoard.Models
{
    public class Post
    {
        public Guid PostId { get; set; }
        public Guid PostedById { get; set; }
        public string Body { get; set; }
        public Comment[] Comments { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Post() { }
    }
}
