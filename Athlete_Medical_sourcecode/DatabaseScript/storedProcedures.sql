DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `availableAppointments`()
    READS SQL DATA
BEGIN
    SELECT * FROM appointment WHERE isAvailable = 1;
END$$
DELIMITER ;