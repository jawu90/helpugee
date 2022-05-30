set client_encoding='UTF-8';

CREATE TYPE category AS ENUM (
'animal_shelter',
'town_hall',
'kindergarten',
'school',
'adult_education_center',
'hospital',
'physician',
'psychological_support',
'religious_facilities',
'repair_shop',
'refugee_accomodation',
'rent_a_bike',
'railway_mission',
'events',
'jobs',
'bank'
);

CREATE TABLE features (
    id INT GENERATED ALWAYS AS IDENTITY,
    label VARCHAR (256) NOT NULL,
    category CATEGORY NOT NULL,
    geom GEOMETRY NOT NULL,
    address VARCHAR (256),
    service_product VARCHAR (256),
    opening_hours VARCHAR (256),
    we_speak VARCHAR (256),
    specific_offer_for_refugees BOOLEAN,
    contact_information VARCHAR (256),
    from_date TIMESTAMP,
    until_date TIMESTAMP,
    other VARCHAR (256),
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

INSERT INTO features(
    label,
    category,
    geom,
    address,
    service_product,
    opening_hours,
    we_speak,
    specific_offer_for_refugees,
    contact_information,
    from_date,
    until_date,
    other,
    created_at,
    created_by
) VALUES (
	'AnkER-Zentrum Deggendorf',
	'refugee_accomodation',
	ST_SetSRID(ST_MakePoint(48.8403285,12.9489849), 4326),
	'Stadtfeldstr. 11, 94469 Deggendorf',
	'',
	'10:00 - 17:00',
	'Deutsch, Englisch',
	TRUE,
	'Telefon: +49 911 943 84904',
	NULL,
	NULL,
	'https://www.openstreetmap.org/search?query=RXR2%2B8R%20Deggendorf',
	current_timestamp,
	'INIT'
),(
	'AnkER-Zentrum Regensburg',
	'refugee_accomodation',
	ST_SetSRID(ST_MakePoint(49.0013959,12.1207222), 4326),
	'Bajuwarenstr. 4, 93053 Regensburg',
	'',
	'10:00 - 17:00',
	'Deutsch, Englisch, Ukrainisch',
	TRUE,
	'Telefon: +49 911 943 44290',
	NULL,
	NULL,
	'https://www.openstreetmap.org/search?query=X4XC%2B76%20Regensburg',				
	current_timestamp,
	'INIT'
);

