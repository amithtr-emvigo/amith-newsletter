-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 11, 2021 at 04:53 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `newsletter_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `email_queue`
--

CREATE TABLE `email_queue` (
  `queue_id` bigint(25) NOT NULL,
  `data` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `remaining_try_count` int(11) NOT NULL DEFAULT 3
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `failed_email_logs`
--

CREATE TABLE `failed_email_logs` (
  `log_id` bigint(25) NOT NULL,
  `email` varchar(250) NOT NULL,
  `newsletter_name` varchar(250) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `failed_email_logs`
--

INSERT INTO `failed_email_logs` (`log_id`, `email`, `newsletter_name`, `created_on`) VALUES
(1, 'amith014@gmail.com', 'TEST News', '2021-07-11 19:34:04'),
(2, 'amith014@gmail.com', 'TEST News', '2021-07-11 19:46:01');

-- --------------------------------------------------------

--
-- Table structure for table `success_email_logs`
--

CREATE TABLE `success_email_logs` (
  `log_id` bigint(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `newsletter_name` varchar(50) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `success_email_logs`
--

INSERT INTO `success_email_logs` (`log_id`, `email`, `newsletter_name`, `created_on`) VALUES
(1, 'amith014@gmail.com', '0', '2021-07-11 19:51:03'),
(2, 'amith014@gmail.com', 'TEST News', '2021-07-11 19:59:04');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `age` int(20) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_on` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `email`, `age`, `created_on`, `updated_on`) VALUES
(4, 'Amith', 'TR', 'amith014@gmail.com', 30, '2021-07-11 12:45:50', '2021-07-11 12:45:50'),
(7, 'Amith', 'TR', 'amithtr014@gmail.com', 30, '2021-07-11 20:00:40', '2021-07-11 20:00:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `email_queue`
--
ALTER TABLE `email_queue`
  ADD PRIMARY KEY (`queue_id`);

--
-- Indexes for table `failed_email_logs`
--
ALTER TABLE `failed_email_logs`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `success_email_logs`
--
ALTER TABLE `success_email_logs`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD KEY `email_2` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `email_queue`
--
ALTER TABLE `email_queue`
  MODIFY `queue_id` bigint(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `failed_email_logs`
--
ALTER TABLE `failed_email_logs`
  MODIFY `log_id` bigint(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `success_email_logs`
--
ALTER TABLE `success_email_logs`
  MODIFY `log_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
