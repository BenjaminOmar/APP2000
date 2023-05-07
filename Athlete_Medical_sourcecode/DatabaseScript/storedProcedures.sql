-- list of all available appointments
DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `availableAppointments`()
    READS SQL DATA
BEGIN
    SELECT * FROM appointment WHERE isAvailable = 1;
END$$
DELIMITER ;

-- list of all available appointments based on specialistId
DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `availableAppointmentsbySpecId`(IN `specId` INT)
    READS SQL DATA
BEGIN
    SELECT * FROM appointment WHERE isAvailable = 1 AND specialistId = specId;
END$$
DELIMITER ;

-- list of all appointments with name
DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `getAll`()
    READS SQL DATA
BEGIN
    SELECT appointment.*, CONCAT(user.FirstName, " ",user.middleName, " ", user.lastName) AS 'Name' FROM appointment, user WHERE appointment.patientId = user.userId;
END$$
DELIMITER ;

-- list of all appointments
DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `getAll2`()
    READS SQL DATA
BEGIN
    SELECT * FROM appointment;
END$$
DELIMITER ;

-- list of all journalnotes
DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `getAllJournals`()
    READS SQL DATA
BEGIN
    SELECT journalnote.*, CONCAT(user.FirstName, " ",user.middleName, " ", user.lastName) AS 'Name' FROM journalnote, user WHERE journalnote.patient = user.userId;
END$$
DELIMITER ;


-- list of all specialists
DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `specialists`()
    READS SQL DATA
BEGIN
    SELECT * FROM user WHERE roleId = 2;
END$$
DELIMITER ;

-- list all patients
DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `patients`()
    READS SQL DATA
BEGIN
    SELECT * FROM user WHERE roleId = 1;
END$$
DELIMITER ;

-- book an appointment
DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `bookAppointment`(IN `appId` INT UNSIGNED, IN `patId` INT)
    MODIFIES SQL DATA
UPDATE appointment
SET isAvailable = 0, patientId = patId
WHERE appointmentId = appId$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `alterAppointment`(
    IN `appId` INT UNSIGNED, 
    IN `startTime` DATETIME, 
    IN `endTime` DATETIME, 
    IN `roomId` INT, 
    IN `patId` INT, 
    IN `specId` INT , 
    IN `isAvailable` TINYINT
    )
    MODIFIES SQL DATA

UPDATE appointment
SET appointmentId = appId, startTime = startTime, endTime = endTime, roomId = roomId, patientId = patId, specialistId = specId, isAvailable = isAvailable 
WHERE appointmentId = appId$$
DELIMITER ;

-- DELIMITER $$
-- CREATE DEFINER=`root`@`%` PROCEDURE `alterAppointment`(
--     IN `appId` INT UNSIGNED, 
--     IN `startingTime` DATETIME, 
--     IN `ending` DATETIME, 
--     IN `roomId` INT, 
--     IN `patId` INT, 
--     IN `specId` INT , 
--     IN `isAvailable` TINYINT 
-- )
--     MODIFIES SQL DATA
-- BEGIN
--     DELETE FROM appointment WHERE appointmentId = appId;
--     INSERT INTO appointment(appointmentId, startTime, endTime, roomId, patientId, specialistId, isAvailable)
--         VALUES(appId, startingTime, ending, roomId, patId, specId, isAvailable);
-- END$$
-- DELIMITER ;

-- alter a journal note
DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `alterJournalNote`(
    IN `id` INT UNSIGNED, 
    IN `journalText` VARCHAR(3000), 
    IN `header` VARCHAR(150), 
    IN `created` DATETIME, 
    IN `patId` INT,
    IN `specId` INT
    )
    MODIFIES SQL DATA

UPDATE journalnote
SET journalnoteId = id, journalnote = journalText, heading = header, created = created, patient = patId, specialist = specId  
WHERE journalnoteId = id$$
DELIMITER ;

-- update a user
DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `alterUser`(
    IN `id` INT UNSIGNED, 
    IN `firstName` VARCHAR(45),
    IN `middleName` VARCHAR(45),
    IN `lastName` VARCHAR(45), 
    IN `phoneNumber` INT, 
    IN `adress` VARCHAR(45),
    IN `zipCode` INT,
    IN `roleId` INT,
    IN `password` VARCHAR(70),
    IN `email` VARCHAR(60) 
    )
    MODIFIES SQL DATA

UPDATE user
SET userId = id, FirstName = firstName, middleName = middleName, lastName = lastName, phoneNumber = phoneNumber, adress = adress, zipCode = zipCode, roleId = roleId, password = password, email = email  
WHERE userId = id$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `appointmentByUserId`(IN `UserId` INT)
    READS SQL DATA
BEGIN
    SELECT appointment.*, CONCAT(user.FirstName, " ",user.middleName, " ", user.lastName) AS 'Name' FROM appointment, user WHERE appointment.specialistId = user.userId AND appointment.patientId = UserId OR appointment.specialistId = UserId;
END$$
DELIMITER ;


