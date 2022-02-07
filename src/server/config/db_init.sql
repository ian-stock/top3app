--DROP TABLE IF EXISTS game;

--schema - id(36), created (timestamp), createdby(36), gameid(10), hostid(36), gamestate(20)
CREATE TABLE IF NOT EXISTS game(
    id VARCHAR(36) PRIMARY KEY,
    created TIMESTAMP DEFAULT NOW(), 
    createdby VARCHAR(36), 
    gameid VARCHAR(10),
    hostid VARCHAR(36),
    gamestate VARCHAR(20) 
);

--ALTER TABLE game ADD COLUMN gameid varchar(10);


--schema - id(36), created (timestamp), createdby(36), username(30), email(50), password(64), currentgame(36)
CREATE TABLE IF NOT EXISTS "user"(
    id VARCHAR(36) PRIMARY KEY,
    created TIMESTAMP DEFAULT NOW(), 
    createdby VARCHAR(36), 
    username VARCHAR(30),
    email VARCHAR(50), 
    password VARCHAR(64),
    currentgame VARCHAR(36) 
);
