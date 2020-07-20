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
rating longtext, 
[date]  DATETIME
)



