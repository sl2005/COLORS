# COLORS

## Brief Description
COLORS is a LAMP-hosted web application backend for user and data management.  
This repository documents and supports the first three project labs:
- **Lab 1 (DigitalOcean + LAMP):** Provision a remote Linux server and configure the LAMP stack.
- **Lab 2 (Database):** Create and populate the MySQL database used by COLORS.
- **Lab 3 (Create API endpoints):** Implement backend API logic required for full application functionality.

## Technologies Used
- **Cloud/Hosting:** DigitalOcean Droplet (Ubuntu Linux)
- **Web Server:** Apache 2
- **Database:** MySQL
- **Backend Runtime:** PHP
- **Version Control:** Git + GitHub

## Repository Structure
- **api/**: PHP backend API endpoints and DB configuration.
- **public/**: Frontend application files (`index.html`, `color.html`, CSS, JS, images).
- **README.md**: Project documentation.
- **LICENSE.md**: Open-source license.
- **.gitignore**: Excluded local/secrets/system files.

## High-Level Setup Instructions

### 1) Provision DigitalOcean Droplet (Lab 1)
1. Create an Ubuntu droplet in DigitalOcean.
2. Add your SSH key during droplet creation.
3. Purchase a domain name through GoDaddy.
4. Connect with SSH:
5. In GoDaddy DNS settings, point your domain to the droplet IP:


```bash
ssh root@<your_droplet_ip>
```

### 2) Install and Configure LAMP (Lab 1)
Should already be set up by DigitalOcean automatically, if not follow instructions below.

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install apache2 mysql-server php libapache2-mod-php php-mysql -y
sudo systemctl enable apache2
sudo systemctl enable mysql
sudo systemctl start apache2
sudo systemctl start mysql
```

### 3) Create and Populate MySQL Database (Lab 2)
1. Create a MySQL user and database for COLORS.
2. Create required tables.
3. Insert seed data needed for testing.

1. Create database

```sql
create database COP4331;
use COP4331;
```

2. Create tables

```sql
CREATE TABLE `COP4331`.`Users` ( `ID` INT NOT NULL AUTO_INCREMENT , `FirstName`
VARCHAR(50) NOT NULL DEFAULT '' , `LastName` VARCHAR(50) NOT NULL DEFAULT '' , `Login`
VARCHAR(50) NOT NULL DEFAULT '' , `Password` VARCHAR(50) NOT NULL DEFAULT '' ,
PRIMARY KEY (`ID`)) ENGINE = InnoDB;

CREATE TABLE `COP4331`.`Users`
(
`ID` INT NOT NULL AUTO_INCREMENT ,
`FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
`LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
`Login` VARCHAR(50) NOT NULL DEFAULT '' ,
`Password` VARCHAR(50) NOT NULL DEFAULT '' ,
PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

CREATE TABLE `COP4331`.`Colors` ( `ID` INT NOT NULL AUTO_INCREMENT , `Name`
VARCHAR(50) NOT NULL DEFAULT '' , `UserID` INT NOT NULL DEFAULT '0' , PRIMARY KEY
(`ID`)) ENGINE = InnoDB;

CREATE TABLE `COP4331`.`Colors`
(
`ID` INT NOT NULL AUTO_INCREMENT ,
`Name` VARCHAR(50) NOT NULL DEFAULT '' ,
`UserID` INT NOT NULL DEFAULT '0' ,
PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

CREATE TABLE `COP4331`.`Contacts`
(
`ID` INT NOT NULL AUTO_INCREMENT ,
`FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
`LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
`Phone` VARCHAR(50) NOT NULL DEFAULT '' ,
`Email` VARCHAR(50) NOT NULL DEFAULT '' ,
`UserID` INT NOT NULL DEFAULT '0' ,
PRIMARY KEY (`ID`)
) ENGINE = InnoDB;
```

### 4) Implement Backend API Endpoints (Lab 3)
1. Add backend PHP endpoints for required app operations (authentication + CRUD, as assigned).
2. Connect endpoints to `colors_db` using secure credentials.
3. Return JSON responses and handle error cases consistently.

## How to Access the Application
Deploy `public/` as your web root (for example, copy contents to `/var/www/html`) and place `api/` under `/var/www/html/api`.

Go to the website by using the domain name http://cop4331-lincoln.xyz/

## Assumptions, Limitations, and AI Usage
- **Assumptions:** Ubuntu-based DigitalOcean droplet, Apache/MySQL/PHP installed via apt packages.
- **Limitations:** Exact database schema and endpoint list depend on assignment-specific requirements and may evolve.
- **Security Note:** Replace example credentials and restrict DB/user permissions before production use.
- **AI Usage (Class Policy):** AI assistance was used for README drafting, command organization, and wording clarity; implementation decisions and validation remain student-directed.