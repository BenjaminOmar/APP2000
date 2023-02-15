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
-- Table `app2000`.`poststed`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app2000`.`poststed` (
  `postNr` INT NOT NULL,
  `postSted` VARCHAR(45) NULL,
  PRIMARY KEY (`postNr`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app2000`.`rolle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app2000`.`rolle` (
  `rolleId` INT NOT NULL,
  `rolleNavn` VARCHAR(45) NULL,
  PRIMARY KEY (`rolleId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app2000`.`bruker`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app2000`.`bruker` (
  `brukerNr` INT NOT NULL AUTO_INCREMENT,
  `fornavn` VARCHAR(45) NOT NULL,
  `mellomNavn` VARCHAR(45) NULL,
  `etternavn` VARCHAR(70) NOT NULL,
  `tlfNr` INT NULL,
  `fødselNr` INT(11) NOT NULL,
  `adresse` VARCHAR(45) NULL,
  `postNr` INT NOT NULL,
  `rolleId` INT NOT NULL,
  `passord` VARCHAR(45) NULL,
  `registrertDato` DATETIME NOT NULL,
  PRIMARY KEY (`brukerNr`),
  INDEX `fk_bruker_poststed_idx` (`postNr` ASC) ,
  INDEX `fk_bruker_rolle1_idx` (`rolleId` ASC) ,
  CONSTRAINT `fk_bruker_poststed`
    FOREIGN KEY (`postNr`)
    REFERENCES `app2000`.`poststed` (`postNr`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bruker_rolle1`
    FOREIGN KEY (`rolleId`)
    REFERENCES `app2000`.`rolle` (`rolleId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app2000`.`rom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app2000`.`rom` (
  `romNr` INT NOT NULL,
  `romNavn` VARCHAR(45) NULL,
  `sittePlasser` INT NULL,
  PRIMARY KEY (`romNr`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app2000`.`avtale`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app2000`.`avtale` (
  `avtaleNr` INT NOT NULL AUTO_INCREMENT,
  `tidStart` DATETIME NULL,
  `tidSlutt` DATETIME NULL,
  `romNr` INT NULL,
  `pasientNr` INT NOT NULL,
  `behandlerNr` INT NOT NULL,
  PRIMARY KEY (`avtaleNr`),
  INDEX `fk_avtale_rom1_idx` (`romNr` ASC) ,
  INDEX `fk_avtale_bruker1_idx` (`pasientNr` ASC) ,
  INDEX `fk_avtale_bruker2_idx` (`behandlerNr` ASC) ,
  CONSTRAINT `fk_avtale_rom1`
    FOREIGN KEY (`romNr`)
    REFERENCES `app2000`.`rom` (`romNr`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_avtale_bruker1`
    FOREIGN KEY (`pasientNr`)
    REFERENCES `app2000`.`bruker` (`brukerNr`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_avtale_bruker2`
    FOREIGN KEY (`behandlerNr`)
    REFERENCES `app2000`.`bruker` (`brukerNr`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app2000`.`journal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app2000`.`journal` (
  `journalNr` INT NOT NULL AUTO_INCREMENT,
  `pasientNr` INT NOT NULL,
  PRIMARY KEY (`journalNr`),
  INDEX `fk_Journal_bruker1_idx` (`pasientNr` ASC) ,
  CONSTRAINT `fk_Journal_bruker1`
    FOREIGN KEY (`pasientNr`)
    REFERENCES `app2000`.`bruker` (`brukerNr`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app2000`.`journalnotat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app2000`.`journalnotat` (
  `JournalnotatNr` INT NOT NULL AUTO_INCREMENT,
  `Dato` DATE NOT NULL,
  `Tid` TIME NOT NULL,
  `journalNr` INT NOT NULL,
  `behandlerNr` INT NOT NULL,
  `journalnotat` VARCHAR(3000) NULL,
  `overskrift` VARCHAR(150) NULL,
  PRIMARY KEY (`JournalnotatNr`),
  INDEX `fk_journalnotat_Journal1_idx` (`journalNr` ASC) ,
  INDEX `fk_journalnotat_bruker1_idx` (`behandlerNr` ASC) ,
  CONSTRAINT `fk_journalnotat_Journal1`
    FOREIGN KEY (`journalNr`)
    REFERENCES `app2000`.`journal` (`journalNr`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_journalnotat_bruker1`
    FOREIGN KEY (`behandlerNr`)
    REFERENCES `app2000`.`bruker` (`brukerNr`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app2000`.`faktura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app2000`.`faktura` (
  `fakturaNr` INT NOT NULL,
  `avtaleDato` DATE NULL,
  `sum` INT NULL,
  `sendtDato` DATE NULL,
  `betaltDato` VARCHAR(45) NULL,
  `bruker_brukerNr` INT NOT NULL,
  PRIMARY KEY (`fakturaNr`),
  INDEX `fk_faktura_bruker1_idx` (`bruker_brukerNr` ASC) ,
  CONSTRAINT `fk_faktura_bruker1`
    FOREIGN KEY (`bruker_brukerNr`)
    REFERENCES `app2000`.`bruker` (`brukerNr`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
