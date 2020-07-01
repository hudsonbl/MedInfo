--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`( 
  `userId` MEDIUMINT(4) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
INSERT INTO `users` (`name`, `email`, `password`) VALUES
  ('Mike Tyson','tigerface@boxing.com','$2a$10$V2ur5B37Gk1gBHBuvUO6Nu.ZWB9B4jNB8E3EBFCo2G7FqGSroOtaW'),
  ('Captain Kurk','kurk@starfleet.com','$2a$10$V2ur5B37Gk1gBHBuvUO6Nu.ZWB9B4jNB8E3EBFCo2G7FqGSroOtaW'),
  ('Tiger Woods','twoods@pga.com','$2a$10$V2ur5B37Gk1gBHBuvUO6Nu.ZWB9B4jNB8E3EBFCo2G7FqGSroOtaW')
  ;
UNLOCK TABLES;

--
-- Table structure for table `doctorvisit`
--

DROP TABLE IF EXISTS `qrimages`;
CREATE TABLE `qrimages`( 
  `imageId` MEDIUMINT(4) NOT NULL AUTO_INCREMENT,
  `userId` MEDIUMINT(4) NOT NULL,
  `filepath` VARCHAR(255) NOT NULL,
  `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY (`imageId`),
  FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `doctorvisit`
--

DROP TABLE IF EXISTS `doctorvisit`;
CREATE TABLE `doctorvisit`( 
  `visitId` MEDIUMINT(4) NOT NULL AUTO_INCREMENT,
  `userId` MEDIUMINT(4) NOT NULL,
  `date` VARCHAR(255) NOT NULL,
  `clinicianName` VARCHAR(255) NOT NULL,
  `notes` VARCHAR(10000) NOT NULL,
  `bloodPressure` VARCHAR(30) NULL,
  `heartRate` VARCHAR(30) NULL,
  PRIMARY KEY (`visitId`),
  FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctorvisit`
--

LOCK TABLES `doctorvisit` WRITE;
INSERT INTO `doctorvisit` (`userId`, `date`, `clinicianName`, `notes`, `bloodPressure`, `heartRate`) VALUES
  ('1', '4/15/2020', 'Dr. Bill','Today was a visit to check the clients lungs. She said she had a uncontrollable cough. I prescribed her medicine.', '150/120', '77'),
  ('1', '4/15/2020', 'Dr. Bill','Today was a physical. Looked healthy and is ready to play sports', '130/120', '60'),
  ('1', '4/15/2020', 'Dr. Bill','Allergies were causing inflammatory symptoms. Recommended allergy medicine', NULL, NULL),
  ('1', '4/15/2020', 'Dr. Evans','Annual checkup. Client looks healthy', '120/100', NULL),
  ('1', '4/15/2020', 'Dr. Evans','Client was having problems with a migrain. Found that she was listening to music too loud', '100/50', '67'),
  ('2', '4/15/2020', 'Dr. Cleopatra','Today was a visit to check the clients lungs. She said she had a uncontrollable cough. I prescribed her medicine.', NULL, '77'),
  ('2', '4/15/2020', 'Dr. Cleopatra','Today was a physical. Looked healthy and is ready to play sports', NULL, NULL),
  ('2', '4/15/2020', 'Dr. Cleopatra','Allergies were causing inflammatory symptoms. Recommended allergy medicine', '150/132', '37'),
  ('2', '4/15/2020', 'Dr. Nickelson','Annual checkup. Client looks healthy', '150/120', NULL),
  ('2', '4/15/2020', 'Dr. Nickelson','Client was having problems with a migrain. Found that she was listening to music too loud', '150/123', '77'),
  ('2', '4/15/2020', 'Dr. Nickelson','Today was a visit to check the clients skuliosis. the allignment has changed since last checkup', '150/126', '56'),
  ('2', '4/15/2020', 'Dr. Nickelson','Had irritation. Suggested a cream to get rid of the rash', NULL, NULL),
  ('2', '4/15/2020', 'Dr. Carey','Found lice in the clients hair. Recommended to use a comb and lice shampoo', '155/120', '47'),
  ('2', '4/15/2020', 'Dr. Carey','Today was a visit to check the clients motor skills. She said she had a nerve problem. I prescribed her medicine.', NULL, '65'),
  ('3', '4/15/2020', 'Dr. Wilson','Today was a visit to check the clients motor skills. She said she had a nerve problem. I prescribed her medicine.', '151/120', '71'),
  ('3', '4/15/2020', 'Dr. Wilson','Had irritation. Suggested a cream to get rid of the rash.', '152/134', '70'),
  ('3', '4/15/2020', 'Dr. Wilson','Allergies were causing inflammatory symptoms. Recommended allergy medicine.', NULL, '87'),
  ('3', '4/15/2020', 'Dr. Hudson','Annual checkup. Client looks healthy.', '150/120', '85'),
  ('3', '4/15/2020', 'Dr. Hudson','Today was a physical. Looked healthy and is ready to play sports.', NULL, '74'),
  ('3', '4/15/2020', 'Dr. Hudson','Found lice in the clients hair. Recommended to use a comb and lice shampoo.', '151/121', '76')
  ;
UNLOCK TABLES;

--
-- Table structure for table `allergies`
--

DROP TABLE IF EXISTS `allergies`;
CREATE TABLE `allergies`( 
  `allergyId` MEDIUMINT(4) NOT NULL AUTO_INCREMENT,
  `userId` MEDIUMINT(4) NOT NULL,
  `allergy` VARCHAR(255) NOT NULL,
  `symptoms` VARCHAR(500) NOT NULL,
  `medication` VARCHAR(255) NULL,
  `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`allergyId`),
  FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `allergies`
--

LOCK TABLES `allergies` WRITE;
INSERT INTO `allergies` (`userId`, `allergy`, `symptoms`, `medication`) VALUES
  ('1', 'Honey Bees', 'Swelling around the throat','Micro dosing honey'),
  ('1', 'Grass', 'rash growth on skin. Makes skin red','Clarinex'),
  ('1', 'Epinephrin', 'Hives formation and swelling around the throat, severe action must be taken','Allegra'),
  ('1', 'Advil', 'Severe swelling and will require a epipen','Xyzal'),
  ('2', 'Advil', 'Itchyness and rash formation','Alavert'),
  ('2', 'Epineprhin', 'Swelling around the throat','Claritin'),
  ('3', 'grass', 'rash growth on skin. Makes skin red','Clarinex'),
  ('3', 'Epinephrin', 'Severe swelling and will require a epipen','Allegra'),
  ('3', 'Honey Bees', 'Swelling around the throat','Xyzal'),
  ('3', 'Flowers', 'Itchyness and rash formation','Alavert'),
  ('3', 'Peanut', 'Hives formation and swelling around the throat, severe action must be taken','Micro dosing honey'),
  ('3', 'Gluten', 'Severe diahrea after consumption','Claritin')
  ;
UNLOCK TABLES;

--
-- Table structure for table `prescribeddrugs`
--

DROP TABLE IF EXISTS `prescribeddrugs`;
CREATE TABLE `prescribeddrugs`( 
  `prescriptionId` MEDIUMINT(4) NOT NULL AUTO_INCREMENT,
  `userId` MEDIUMINT(4) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `startdate` VARCHAR(255) NULL,
  `enddate` VARCHAR(255) NULL,
  `symptoms` VARCHAR(500) NULL,
  PRIMARY KEY (`prescriptionId`),
  FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prescribeddrugs`
--

LOCK TABLES `prescribeddrugs` WRITE;
INSERT INTO `prescribeddrugs` (`userId`, `name`, `startdate`, `enddate`, `symptoms`) VALUES
  ('1','Vicodin','6/11/20','6/30/20','Noticed an uncomfortable increase in heart rate'),
  ('1','Norco','5/05/20','7/30/20','Couldnt sleep at night had trouble falling asleep'),
  ('1','Xodol', NULL, NULL, NULL),
  ('1','Amoxil','4/30/20', NULL,'Upset stomach made it hard to eat'),
  ('2','Neurontin','2/21/20','8/30/20','Good symptoms dont notice anything bad'),
  ('2','Prinivil','1/11/20','3/30/20','Noticed an uncomfortable increase in heart rate'),
  ('3','Zestril','7/20/20','10/30/20','Noticed an uncomfortable increase in heart rate'),
  ('3','Lipitor','10/21/20','12/30/20', NULL),
  ('3','Glucophage','12/11/19',NULL,'Couldnt sleep at night had trouble falling asleep'),
  ('3','Amoxil', NULL,'7/30/20','Upset stomach made it hard to eat'),
  ('3','Norco', NULL, NULL, NULL)
  ;
UNLOCK TABLES;

--
-- Table structure for table `chronichealth`
--

DROP TABLE IF EXISTS `chronichealth`;
CREATE TABLE `chronichealth`( 
  `chronicId` MEDIUMINT(4) NOT NULL AUTO_INCREMENT,
  `userId` MEDIUMINT(4) NOT NULL,
  `condition` VARCHAR(255) NOT NULL,
  `notes` VARCHAR(10000) NULL,
  PRIMARY KEY (`chronicId`),
  FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chronichealth`
--

LOCK TABLES `chronichealth` WRITE;
INSERT INTO `chronichealth` (`userId`, `condition`, `notes`) VALUES
  ('1','Epileptic','Cant drive because the client had a seizure in past 6 months'),
  ('1','Auto Immune Disorder','Cant eat certain foods and needs to take multivitamin'),
  ('1','Arthritis','Joint pain. Fluid needs to be extracted once every year'),
  ('1','Asthma','Required an inhaler'),
  ('2','Cancer','Stage 1 non severe case. May have another check up in several months to look for growth.'),
  ('2','Hepatitis C','Needs to take blood sugar frequently'),
  ('2','Arthritis','Joint pain. Fluid needs to be extracted once every year'),
  ('2','Auto Immune Disorder','Cant eat certain foods and needs to take multivitamin'),
  ('3','Epileptic','Cant drive because the client had a seizure in past 6 months'),
  ('3','Asthma','Required an inhaler'),
  ('3','Cancer','Stage 1 non severe case. May have another check up in several months to look for growth.'),
  ('3','Auto Immune Disorder','Cant eat certain foods and needs to take multivitamin'),
  ('3','Hepatitis C','Needs to take blood sugar frequently')
  ;
UNLOCK TABLES;

--
-- Table structure for table `labreports`
--

DROP TABLE IF EXISTS `labreports`;
CREATE TABLE `labreports`( 
  `reportId` MEDIUMINT(4) NOT NULL AUTO_INCREMENT,
  `userId` MEDIUMINT(4) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `filetype` VARCHAR(255) NOT NULL,
  `filepath` VARCHAR(255) NOT NULL,
  `notes` VARCHAR(10000) NULL,
  PRIMARY KEY (`reportId`),
  FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `immunizationrecords`
--

DROP TABLE IF EXISTS `immunizationrecords`;
CREATE TABLE `immunizationrecords`( 
  `recordId` MEDIUMINT(4) NOT NULL AUTO_INCREMENT,
  `userId` MEDIUMINT(4) NOT NULL,
  `vaccine` VARCHAR(255) NOT NULL,
  `dateGiven` VARCHAR(255) NOT NULL,
  `administeredBy` VARCHAR(255) NOT NULL,
  `nextDose` VARCHAR(255) NULL,
  PRIMARY KEY (`recordId`),
  FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `immunizationrecords`
--

LOCK TABLES `immunizationrecords` WRITE;
INSERT INTO `immunizationrecords` (`userId`, `vaccine`, `dateGiven`, `administeredBy`, `nextDose`) VALUES
  ('1','Adenovirus','3/03/2020','Dr. Phil','6/15/2020'),
  ('1','Anthrax','6/03/2013','Dr. Phil',NULL),
  ('1','Cholera','8/03/2014','Dr. Knight','6/03/2020'),
  ('1','DTaP','5/03/2020','Dr. Knight','3/30/2020'),
  ('1','DT','3/14/2020','Clinic',NULL),
  ('1','Hepatitis A','6/03/2019','Dr. Mary','5/03/2020'),
  ('2','Human Papillomavirus(HPV)','6/03/2008','Dr. Phillip','7/03/2020'),
  ('2','Influenza','4/03/2015','Clinic','8/03/2020'),
  ('2','Anthrax','7/03/2015','Dr. Phillip',NULL),
  ('2','Adenovirus','6/17/2019','Clinic','10/03/2020'),
  ('3','Hepatitis A','6/14/2017','Dr. Knight',NULL),
  ('3','Human Papillomavirus(HPV)','6/03/2018','Dr. Phil',NULL),
  ('3','DTaP','5/03/2019','Clinic','12/03/2020'),
  ('3','DT','6/05/2020','Dr. Phillip',NULL),
  ('3','Meningococcal','6/03/2020','Clinic','11/03/2020')
  ;
UNLOCK TABLES;

--
-- Table structure for table `servererrors`
--

DROP TABLE IF EXISTS `servererrors`;
CREATE TABLE `servererrors`( 
  `errorId` MEDIUMINT(4) NOT NULL AUTO_INCREMENT,
  `errorMessage` VARCHAR(255) NOT NULL,
  `errorStatus` VARCHAR(255) NOT NULL,
  `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`errorId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `hospitalvisit`
--

DROP TABLE IF EXISTS `hospitalvisit`;
CREATE TABLE `hospitalvisit`( 
  `visitId` MEDIUMINT(4) NOT NULL AUTO_INCREMENT,
  `userId` MEDIUMINT(4) NOT NULL,
  `date` VARCHAR(255) NOT NULL,
  `clinicianName` VARCHAR(255) NOT NULL,
  `notes` VARCHAR(10000) NOT NULL,
  `labreportId` MEDIUMINT(4) NULL,
  PRIMARY KEY (`visitId`),
  FOREIGN KEY (`labreportId`) REFERENCES `labreports` (`reportId`),
  FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) 
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hospitalvisit`
--

LOCK TABLES `hospitalvisit` WRITE;
INSERT INTO `hospitalvisit` (`userId`, `date`, `clinicianName`, `notes`, `labreportId`) VALUES
  ('1', '4/15/2020', 'Dr. Bill','Client broke her arm needed medical attention', NULL),
  ('1', '2/13/2020', 'Dr. Phil','Client had a concussion. Needed life flight', NULL),
  ('1', '6/15/2020', 'Dr. Nancy','Client needed a blood transfusion', NULL),
  ('2', '3/10/2020', 'Dr. Grace','Client broke her arm needed medical attention', NULL),
  ('2', '4/19/2020', 'Dr. Bill','Client broke her tibia. Needed a cast', NULL),
  ('2', '1/18/2020', 'Dr. Phil','Client brokeded his nose needed medical attention', NULL),
  ('2', '4/16/2020', 'Dr. Nancy','Client broke sprained his ankle needed medical attention', NULL),
  ('3', '6/15/2020', 'Dr. Nancy','Client broke her arm needed medical attention', NULL),
  ('3', '4/12/2020', 'Dr. Bill','Client broke her tibia. Needed a cast', NULL),
  ('3', '3/11/2020', 'Dr. Grace','Client broke sprained his ankle needed medical attention', NULL)
  ;
UNLOCK TABLES;