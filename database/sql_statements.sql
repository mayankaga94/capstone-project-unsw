--Create user table-----------

create TABLE user
( 
userid MEDIUMINT AUTO_INCREMENT primary key , 
firstname longtext, 
lastname longtext, 
emailid longtext, 
password longtext, 
avatarpath longtext, 
level int, 
dob date
) 

----Book Table: upload from Book_dataset.csv -----------------


-----book rating table------
create TABLE book_ratings
( ratingid MEDIUMINT primary key AUTO_INCREMENT, 
ISBN MEDIUMINT, 
userid MEDIUMINT, 
rating FLOAT, 
date  DATETIME,
FOREIGN KEY (userid) REFERENCES User(userid),
)

-----------------Add points to User table-------------------------

Alter Table user
ADD COLUMN points MEDIUMINT DEFAULT 0 AFTER dob;

-----------------------User wish list----------------------------------

create TABLE wishlist
( wishlistid MEDIUMINT primary key AUTO_INCREMENT, 
userid MEDIUMINT, 
ISBN MEDIUMINT, 
purchased varchar(255) DEFAULT 'N',
FOREIGN KEY (userid) REFERENCES User(userid)
)

----------------user tasklist----------------------------------
create TABLE tasklist
( 
tasklistid MEDIUMINT primary key AUTO_INCREMENT, 
userid MEDIUMINT, 
task longtext, 
status varchar(255) DEFAULT 'To Do',
FOREIGN KEY (userid) REFERENCES User(userid)
)

---------------Review------------------------------------------
create TABLE review
( 
reviewid MEDIUMINT primary key AUTO_INCREMENT, 
userid MEDIUMINT, 
bookid bigint, 
comment longtext,
votes MEDIUMINT DEFAULT 0,
FOREIGN KEY (userid) REFERENCES user(userid)
)
-------------------Vote----------------------------------------
create TABLE vote
( 
reviewid MEDIUMINT,
userid MEDIUMINT, 
vote MEDIUMINT,
FOREIGN KEY (reviewid) REFERENCES review(reviewid),
FOREIGN KEY (userid) REFERENCES user(userid)
)