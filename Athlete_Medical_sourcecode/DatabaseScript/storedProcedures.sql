-- list of all available appointments
DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `availableAppointments`()
    READS SQL DATA
BEGIN
    SELECT * FROM appointment WHERE isAvailable = 1;
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

DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `alterJournalNote`(
    IN `id` INT UNSIGNED, 
    IN `journalText` VARCHAR(3000), 
    IN `header` VARCHAR(150), 
    IN `created` DATETIME, 
    IN `patId` INT
    )
    MODIFIES SQL DATA

UPDATE journalnote
SET journalnoteId = id, journalnote = journalText, heading = header, created = created, patient = patId  
WHERE journalnoteId = id$$
DELIMITER ;


