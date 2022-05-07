set client_encoding='UTF-8';

CREATE TABLE features (
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (256) NOT NULL,
    geom GEOMETRY NOT NULL,
    address VARCHAR (256),
    service_product VARCHAR (256),
    opening_hours VARCHAR (256),
    we_speak VARCHAR (256),
    specific_offer_for_refugees BOOLEAN,
    contact_information VARCHAR (256),
    from_date: TIMESTAMP,
    until_date: TIMESTAMP,
    other: VARCHAR (256),
    created_at TIMESTAMP NOT NULL,
    created_by VARCHAR (256) NOT NULL,
    modified_at TIMESTAMP,
    modified_by VARCHAR (256),
    is_deleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id)
);

CREATE INDEX features_geom_idx
  ON features
  USING GIST (geom);




