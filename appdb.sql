-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: יוני 14, 2026 בזמן 05:01 PM
-- גרסת שרת: 8.4.9
-- PHP Version: 8.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appdb`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `develop_groups`
--

CREATE TABLE `develop_groups` (
  `group_id` int NOT NULL,
  `group_name` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- הוצאת מידע עבור טבלה `develop_groups`
--

INSERT INTO `develop_groups` (`group_id`, `group_name`) VALUES
(1, 'Frontend Team'),
(2, 'Backend Team'),
(3, 'Full Stack Team'),
(4, 'QA Team'),
(5, 'Mobile Team'),
(6, 'DevOps Team'),
(7, 'Database Team');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `meetings`
--

CREATE TABLE `meetings` (
  `meeting_id` int NOT NULL,
  `group_id` int NOT NULL,
  `start_datetime` datetime NOT NULL,
  `end_datetime` datetime NOT NULL,
  `meeting_description` text,
  `meeting_room` varchar(100) NOT NULL
) ;

--
-- הוצאת מידע עבור טבלה `meetings`
--

INSERT INTO `meetings` (`meeting_id`, `group_id`, `start_datetime`, `end_datetime`, `meeting_description`, `meeting_room`) VALUES
(4, 4, '2026-06-16 11:00:00', '2026-06-16 12:00:00', 'QA testing updates', 'dalet room'),
(5, 5, '2026-06-17 09:30:00', '2026-06-17 10:30:00', 'Mobile app design meeting', 'hey room'),
(6, 6, '2026-06-17 12:00:00', '2026-06-17 13:00:00', 'DevOps deployment planning', 'gimmel room'),
(7, 7, '2026-06-18 08:30:00', '2026-06-18 09:30:00', 'Database structure review', 'bet room'),
(8, 1, '2026-06-08 10:00:00', '2026-06-08 11:00:00', 'Frontend UI fixes', 'gimmel room'),
(9, 2, '2026-06-12 07:00:00', '2026-06-12 14:00:00', 'Backend bug fixing', 'alef room'),
(11, 1, '2026-06-20 09:00:00', '2026-06-20 10:00:00', 'New frontend meeting', 'vav room'),
(14, 3, '2026-06-15 17:32:00', '2026-06-16 19:32:00', 'hdsdfghj', 'ngdtk'),
(15, 1, '2026-06-14 19:43:00', '2026-06-16 22:40:00', 'sdfgh', 'drtjd'),
(16, 2, '2026-06-14 19:42:00', '2026-06-14 22:40:00', 'dfgh', 'sdfgh');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `develop_groups`
--
ALTER TABLE `develop_groups`
  ADD PRIMARY KEY (`group_id`);

--
-- אינדקסים לטבלה `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`meeting_id`),
  ADD KEY `group_id` (`group_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `develop_groups`
--
ALTER TABLE `develop_groups`
  MODIFY `group_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `meeting_id` int NOT NULL AUTO_INCREMENT;

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `meetings`
--
ALTER TABLE `meetings`
  ADD CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `develop_groups` (`group_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
