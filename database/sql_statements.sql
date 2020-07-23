--Create user table-----------

create TABLE User
( userid MEDIUMINT AUTO_INCREMENT primary key , 
firstname longtext, 
lastname longtext, 
emailid longtext, 
password longtext, 
avatarpath longtext, 
level int, 
dob date) 

----Book Table: upload from Book_dataset.csv -----------------


-----book rating table------
create TABLE book_ratings
( ratingid MEDIUMINT primary key AUTO_INCREMENT, 
bookid MEDIUMINT, 
userid MEDIUMINT, 
rating FLOAT, 
[date]  DATETIME,
FOREIGN KEY (bookid) REFERENCES book_dataset(bookid),
FOREIGN KEY (userid) REFERENCES User(userid),
)

-----------------Add points to User table-------------------------

Alter Table User
ADD COLUMN points MEDIUMINT AFTER dob;

-----------------------User wish list----------------------------------

create TABLE wishlist
( wishlistid MEDIUMINT primary key AUTO_INCREMENT, 
userid MEDIUMINT, 
bookid MEDIUMINT, 
purchased varchar(255) DEFAULT 'N',
FOREIGN KEY (bookid) REFERENCES book_dataset(bookid),
FOREIGN KEY (userid) REFERENCES User(userid),
)

----------------


