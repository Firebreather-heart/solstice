CREATE DATABASE IF NOT EXISTS solstice;

DELIMITER $$
CREATE PROCEDURE CreateUserIfNotExists(IN p_username VARCHAR(16), IN p_password VARCHAR(41))
BEGIN
  IF NOT EXISTS (SELECT 1 FROM mysql.user WHERE user = p_username)
  THEN
    CREATE USER p_username IDENTIFIED BY p_password;
  END IF;
END$$
DELIMITER ;

CALL CreateUserIfNotExists('solsticemaker', 'solsticepass');

GRANT ALL PRIVILEGES ON solstice.* TO 'solsticemaker'@'%';
FLUSH PRIVILEGES;