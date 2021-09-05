CREATE TABLE Users (
	UserId		UNIQUEIDENTIFIER PRIMARY KEY,
	UserName	VARCHAR(50), 
	Pass		VARCHAR(50), 
	Email		VARCHAR(50), 
	FirstName	VARCHAR(50), 
	LastName	VARCHAR(50), 
	Image		VARCHAR(500),
	CreatedAt	Datetime,
	UpdatedAt	DateTime
)


