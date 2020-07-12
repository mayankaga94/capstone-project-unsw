--Create user table

create TABLE User( userid int primary key, firstname longtext, lastname longtext, emailid longtext, password longtext, avatarpath longtext, level int, dob date 


--	user id auto increment
ALTER TABLE sql12350649.User MODIFY userid MEDIUMINT NOT NULL AUTO_INCREMENT