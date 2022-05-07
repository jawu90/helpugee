set client_encoding='UTF-8';

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (256) NOT NULL,
    forename VARCHAR (256),
    surname VARCHAR (256),
    email VARCHAR (256),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL,
    created_by VARCHAR (256) NOT NULL,
    modified_at TIMESTAMP,
    modified_by VARCHAR (256),
    is_deleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id)
);

INSERT INTO users
        (username, password, forename, surname, email, created_at, created_by)
    VALUES
        ('smeier', '$2b$10$xQS7qUg1SMH1yuCnaldOUuyIW/BYslnQyyU8EjhOS0b6XnKeqomjK', 'Sepp', 'Maier', 'maier@blabla.com', current_timestamp, 'INIT'),
        ('ukeller', '$2b$10$gvygRocM5fecYOReq.gSWOC6NNikbnJMlmuuo0m.Q04btbw3uqF6C', 'Ulli', 'Keller', 'keller@blabla.org', current_timestamp, 'INIT')

