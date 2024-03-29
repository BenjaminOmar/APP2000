-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema app2000
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema app2000
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `app2000` DEFAULT CHARACTER SET utf8 ;
USE `app2000` ;

-- -----------------------------------------------------
-- Table `app2000`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app2000`.`role` (
  `roleId` INT NOT NULL,
  `roleName` VARCHAR(45) NULL,
  PRIMARY KEY (`roleId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app2000`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app2000`.`user` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(45) NOT NULL,
  `middleName` VARCHAR(45) NULL,
  `lastName` VARCHAR(70) NOT NULL,
  `phoneNumber` INT NULL,
  `socialSecurityNum` VARCHAR(11) NOT NULL,
  `adress` VARCHAR(45) NULL,
  `zipCode` INT NOT NULL,
  `roleId` INT NOT NULL,
  `password` VARCHAR(70) NOT NULL,
  `regDate` DATETIME NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`userId`),
  INDEX `fk_bruker_rolle1_idx` (`roleId` ASC) ,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) ,
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) ,
  CONSTRAINT `fk_bruker_rolle1`
    FOREIGN KEY (`roleId`)
    REFERENCES `app2000`.`role` (`roleId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app2000`.`room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app2000`.`room` (
  `roomId` INT NOT NULL,
  `roomName` VARCHAR(45) NULL,
  `seats` INT NULL,
  PRIMARY KEY (`roomId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app2000`.`appointment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app2000`.`appointment` (
  `appointmentId` INT NOT NULL AUTO_INCREMENT,
  `startTime` DATETIME NULL,
  `endTime` DATETIME NULL,
  `roomId` INT NULL,
  `patientId` INT NULL,
  `specialistId` INT NOT NULL,
  `isAvailable` TINYINT NOT NULL,
  PRIMARY KEY (`appointmentId`),
  INDEX `fk_avtale_rom1_idx` (`roomId` ASC) ,
  INDEX `fk_avtale_bruker1_idx` (`patientId` ASC) ,
  INDEX `fk_avtale_bruker2_idx` (`specialistId` ASC) ,
  CONSTRAINT `fk_avtale_rom1`
    FOREIGN KEY (`roomId`)
    REFERENCES `app2000`.`room` (`roomId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_avtale_bruker1`
    FOREIGN KEY (`patientId`)
    REFERENCES `app2000`.`user` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_avtale_bruker2`
    FOREIGN KEY (`specialistId`)
    REFERENCES `app2000`.`user` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app2000`.`journalnote`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app2000`.`journalnote` (
  `journalnoteId` INT NOT NULL AUTO_INCREMENT,
  `journalnote` VARCHAR(3000) NULL,
  `heading` VARCHAR(150) NULL,
  `created` DATETIME NOT NULL,
  `patient` INT NOT NULL,
  `specialist` INT NOT NULL,
  PRIMARY KEY (`journalnoteId`),
  INDEX `fk_journalnote_user1_idx` (`patient` ASC) ,
  INDEX `fk_journalnote_user2_idx` (`specialist` ASC) ,
  CONSTRAINT `fk_journalnote_user1`
    FOREIGN KEY (`patient`)
    REFERENCES `app2000`.`user` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_journalnote_user2`
    FOREIGN KEY (`specialist`)
    REFERENCES `app2000`.`user` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
