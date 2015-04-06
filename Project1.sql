use mmorrow;

drop table if exists Ratings;
drop table if exists Reviews;
drop table if exists User;
drop table if exists Developers;
drop table if exists Games;

create table Games(
	GameTitle varchar(255), 
	GameID int primary key auto_increment, 
	Publisher varchar(255));
create table Developers(
	GameID int, 
    foreign key(GameID) references Games(GameID) on delete cascade on update cascade, 
    Developer varchar(255), 
    primary key(GameID, Developer));
create table User(Username varchar(255) primary key, Email varchar(255));
create table Reviews(
	Username varchar(255), 
    GameID int, 
    Review varchar(255), primary key(Username,GameID),
    foreign key(Username) references User(Username) on delete cascade on update cascade,
    foreign key(GameID) references Games(GameID) on delete cascade on update cascade);
create table Ratings(
	GameID int, 
    Username varchar(255), 
    Rating int, 
    foreign key(GameID) references Games(GameID) on delete cascade on update cascade,
    foreign key(Username) references User(Username) on delete cascade on update cascade);
    
insert into Games(GameTitle,Publisher) values('Super Mario Bros.','Nintendo');
insert into Games(GameTitle,Publisher) values('Super Mario Bros. 2','Nintendo');
insert into Games(GameTitle,Publisher) values('Super Mario Bros. 3','Nintendo');
insert into Games(GameTitle,Publisher) values('Sonic','Sega');
insert into Games(GameTitle,Publisher) values('Sonic 2','Sega');
insert into Games(GameTitle,Publisher) values('Sonic 3','Sega');
insert into Games(GameTitle,Publisher) values('Bioshock','2K');
insert into Games(GameTitle,Publisher) values('Bioshock 2','2K Games');
insert into Games(GameTitle,Publisher) values('Bioshock Infinite','2K Games');

insert into Developers values(1, 'Nintendo');
insert into Developers values(2, 'Nintendo');
insert into Developers values(3, 'Nintendo');
insert into Developers values(4, 'Sonic Team');
insert into Developers values(5, 'Sonic Team');
insert into Developers values(6, 'Sonic Team');
insert into Developers values(7, '2K Boston');
insert into Developers values(7, '2K Australia');
insert into Developers values(8, '2K Marin');
insert into Developers values(8, '2K Australia');
insert into Developers values(9, 'Irrational Games');

insert into User values('NoScript','john@gmail.com');
insert into User values('Rubyd','chris@gmail.com');
insert into User values('CoNtRolFrEaK','laura@gmail.com');
insert into User values('PuttPuttGoesToTheZoo','gary@gmail.com');
insert into User values('ToastMaster','kim@gmail.com');
insert into User values('MooseRacer','bob@gmail.com');
insert into User values('DatNinja','mary@gmail.com');
insert into User values('ToastWithTheMost','kimmy@gmail.com');

insert into Reviews values('NoScript',1,'It is the best!');
insert into Reviews values('NoScript',2,'It is grabage!');
insert into Reviews values('CoNtRoLFrEaK',3,'Not as good as first, better than second');
insert into Reviews values('CoNtRoLFrEaK',4,'You gotta go fast with this game!');
insert into Reviews values('ToastMaster',6,'Love the Knuckles expansion!');
insert into Reviews values('MooseRacer',7,'Reinvents the genre!');
insert into Reviews values('DatNinja',8,'It is a cash grab!');
insert into Reviews values('ToastWithTheMost',9,'It is so deep!');

insert into Ratings values(1,'NoScript',5);
insert into Ratings values(2,'NoScript',1);
insert into Ratings values(3,'PuttPuttGoesToTheZoo',4);
insert into Ratings values(5,'CoNtRoLFrEaK',5);
insert into Ratings values(6,'MooseRacer',5);
insert into Ratings values(7,'MooseRacer',5);
insert into Ratings values(8,'ToastWithTheMost',2);
insert into Ratings values(9,'DatNinja',5);