Create table Categories(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name varchar(100),
    icon_url varchar(255)
);

Create table Quotes(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    CategoryId int,
    Image_url varchar(255),
    BookmarkCounter int
);

Create table Users(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name varchar(40),
    password varchar(500),
    isAdmin tinyint
)