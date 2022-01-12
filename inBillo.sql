CREATE SCHEMA InBillo;

--Table For User Info
CREATE TABLE users.InBillo(
id int PRIMARY KEY AUTO_INCREMENT
,fullname varchar(200) NOT NULL,
banknumber int NOT NULL,
account_bal float not Null DEFAULT 0.0,
create_date DATE NOT NULL,
write_date DATE NOT NULL);

--Table to log operations
CREATE TABLE logTransaction.InBillo(
id bigint PRIMARY KEY AUTO_INCREMENT,
fin_operation varchar(200) NOT NULL, --inbound  (credit), outbound (debit)
description Text, -- lending / borrowing , buying / selling 
userId int NOT NULL ,
amount float not Null Default 0.0,
log_date DATE NOT NULL);

ALTER TABLE logTransaction.InBillo ADD CONSTRAINT FK_userId FOREIGN KEY(userId)
REFERENCES users(id);