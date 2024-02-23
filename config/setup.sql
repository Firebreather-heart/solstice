CREATE DATABASE  solstice;

CREATE USER solsticemaker WITH PASSWORD 'solsticepass';

ALTER ROLE solsticemaker SET client_encoding TO 'utf8';
ALTER ROLE solsticemaker SET default_transaction_isolation TO 'read committed';
ALTER ROLE solsticemaker SET timezone TO 'UTC';

GRANT ALL PRIVILEGES ON DATABASE solstice TO solsticemaker;
