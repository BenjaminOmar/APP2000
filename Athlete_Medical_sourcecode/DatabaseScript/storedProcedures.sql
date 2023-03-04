-- list of all available appointments
DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `availableAppointments`()
    READS SQL DATA
BEGIN
    SELECT * FROM appointment WHERE isAvailable = 1;
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