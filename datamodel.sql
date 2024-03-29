-- MySQL Script generated by MySQL Workbench
-- Wed Aug 19 16:18:06 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema handyparking
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `handyparking` ;

-- -----------------------------------------------------
-- Schema handyparking
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `handyparking` DEFAULT CHARACTER SET utf8 ;
USE `handyparking` ;

-- -----------------------------------------------------
-- Table `handyparking`.`Area`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `handyparking`.`Area` ;

CREATE TABLE IF NOT EXISTS `handyparking`.`Area` (
  `idArea` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `x1` DOUBLE NOT NULL,
  `x2` DOUBLE NOT NULL,
  `y1` DOUBLE NOT NULL,
  `y2` DOUBLE NOT NULL,
  PRIMARY KEY (`idArea`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `handyparking`.`AuthTokens`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `handyparking`.`AuthTokens` ;

CREATE TABLE IF NOT EXISTS `handyparking`.`AuthTokens` (
  `token` VARCHAR(100) NOT NULL,
  `Users_idUsers` INT NOT NULL,
  `valid` TINYINT NULL DEFAULT 1,
  `timestamp` TIMESTAMP NULL DEFAULT NOW(),
  PRIMARY KEY (`token`),
  INDEX `fk_AuthTokens_Users1_idx` (`Users_idUsers` ASC) VISIBLE,
  CONSTRAINT `fk_AuthTokens_Users1`
    FOREIGN KEY (`Users_idUsers`)
    REFERENCES `handyparking`.`Users` (`idUsers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `handyparking`.`Favorites`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `handyparking`.`Favorites` ;

CREATE TABLE IF NOT EXISTS `handyparking`.`Favorites` (
  `idFavorites` INT NOT NULL,
  `Users_idUsers` INT NOT NULL,
  `Area_idArea` INT NOT NULL,
  `rating` FLOAT NULL DEFAULT 0.0,
  PRIMARY KEY (`idFavorites`),
  INDEX `fk_Favorites_Users_idx` (`Users_idUsers` ASC) VISIBLE,
  INDEX `fk_Favorites_Area1_idx` (`Area_idArea` ASC) VISIBLE,
  CONSTRAINT `fk_Favorites_Users`
    FOREIGN KEY (`Users_idUsers`)
    REFERENCES `handyparking`.`Users` (`idUsers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Favorites_Area1`
    FOREIGN KEY (`Area_idArea`)
    REFERENCES `handyparking`.`Area` (`idArea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `handyparking`.`History`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `handyparking`.`History` ;

CREATE TABLE IF NOT EXISTS `handyparking`.`History` (
  `idHistory` INT NOT NULL AUTO_INCREMENT,
  `Users_idUsers` INT NOT NULL,
  `ParkingSpots_idParkingSpots` INT NOT NULL,
  PRIMARY KEY (`idHistory`),
  INDEX `fk_History_Users1_idx` (`Users_idUsers` ASC) VISIBLE,
  INDEX `fk_History_ParkingSpots1_idx` (`ParkingSpots_idParkingSpots` ASC) VISIBLE,
  CONSTRAINT `fk_History_Users1`
    FOREIGN KEY (`Users_idUsers`)
    REFERENCES `handyparking`.`Users` (`idUsers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_History_ParkingSpots1`
    FOREIGN KEY (`ParkingSpots_idParkingSpots`)
    REFERENCES `handyparking`.`ParkingSpots` (`idParkingSpots`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `handyparking`.`ParkingSpots`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `handyparking`.`ParkingSpots` ;

CREATE TABLE IF NOT EXISTS `handyparking`.`ParkingSpots` (
  `x` DOUBLE NOT NULL,
  `y` DOUBLE NOT NULL,
  `idParkingSpots` INT NOT NULL AUTO_INCREMENT,
  `occupied` TINYINT NULL DEFAULT 0,
  `image` VARCHAR(100) NULL,
  `rating` DOUBLE DEFAULT 0.0,
  `Users_idUsers` INT NOT NULL,
  CONSTRAINT `fk_Users_idUsers`
    FOREIGN KEY (`Users_idUsers`)
    REFERENCES `handyparking`.`Users` (`idUsers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  PRIMARY KEY (`idParkingSpots`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `handyparking`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `handyparking`.`Users` ;

CREATE TABLE IF NOT EXISTS `handyparking`.`Users` (
  `idUsers` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `guide` TINYINT NOT NULL DEFAULT 0,
  `password` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idUsers`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
