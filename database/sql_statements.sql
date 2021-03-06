-- Create user table-----------

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
) ;

-- --Book Table: upload from Book_dataset.csv -----------------


-- ---book rating table------
create TABLE book_ratings
( ratingid MEDIUMINT primary key AUTO_INCREMENT, 
ISBN BIGINT, 
userid MEDIUMINT, 
rating FLOAT, 
date  DATETIME,
FOREIGN KEY (userid) REFERENCES user(userid),
);

-- ---------------Add points to User table-------------------------

Alter Table user
ADD COLUMN points MEDIUMINT DEFAULT 0 AFTER dob;

-- ---------------------User wish list----------------------------------

create TABLE wishlist
( 
wishlistid MEDIUMINT primary key AUTO_INCREMENT, 
wishlistname VARCHAR(255),
userid MEDIUMINT, 
ISBN BIGINT, 
purchased varchar(255) DEFAULT 'N',
FOREIGN KEY (userid) REFERENCES user(userid)
);

-- --------------user tasklist----------------------------------
create TABLE tasklist
( 
tasklistid MEDIUMINT primary key AUTO_INCREMENT, 
userid MEDIUMINT, 
task longtext, 
status varchar(255) DEFAULT 'To Do',
FOREIGN KEY (userid) REFERENCES User(userid)
);

-- -------------Review------------------------------------------
create TABLE review
( 
reviewid MEDIUMINT primary key AUTO_INCREMENT, 
userid MEDIUMINT, 
bookid bigint, 
comment longtext,
votes MEDIUMINT DEFAULT 0,
FOREIGN KEY (userid) REFERENCES user(userid)
);
-- -----------------Vote----------------------------------------
create TABLE vote
( 
reviewid MEDIUMINT,
userid MEDIUMINT, 
vote MEDIUMINT,
primary key (reviewid,userid),
FOREIGN KEY (reviewid) REFERENCES review(reviewid),
FOREIGN KEY (userid) REFERENCES user(userid)
);

-- -----------------Cart----------------------------------------
Create table cart
( 
userid MEDIUMINT,
ISBN VARCHAR(13),
readBook  Boolean ,    
primary key (userid,ISBN),
FOREIGN KEY (userid) REFERENCES user(userid)
);
-- -----------------Admin----------------------------------------
create table adminLogin(
username varchar(30) primary key,
firstname varchar(30) not null,
lastname varchar(30) not null,
email varchar(30) not null unique,
password varchar(200) not null
);