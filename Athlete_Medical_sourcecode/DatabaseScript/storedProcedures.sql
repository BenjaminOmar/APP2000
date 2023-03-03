
-- available appointments
    availableAppointments

    BEGIN
        SELECT * FROM appointment WHERE isAvailable = 1;
    END

    CALL availableAppointments();

--