-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 23, 2023 at 11:04 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `esabong`
--
CREATE DATABASE IF NOT EXISTS `esabong` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `esabong`;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(44, '2014_10_12_000000_create_users_table', 1),
(45, '2014_10_12_100000_create_password_resets_table', 1),
(46, '2019_08_19_000000_create_failed_jobs_table', 1),
(47, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(48, '2023_07_17_120526_create_wallets_table', 1),
(49, '2023_07_17_185638_create_tbl_sabongtransactions_table', 1),
(50, '2023_07_17_190720_create_sabong_histories_table', 1),
(51, '2023_07_17_203156_create_withdraw_requests_table', 1),
(52, '2023_07_19_153758_create_stream_configuration', 1),
(53, '0000_00_00_000000_create_websockets_statistics_entries_table', 2),
(54, '0000_00_00_000000_rename_statistics_counters', 3),
(55, '2023_07_22_112057_referral_codes', 4);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `referral_codes`
--

CREATE TABLE `referral_codes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_level` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sabong_histories`
--

CREATE TABLE `sabong_histories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `gameNo` int(11) DEFAULT NULL,
  `result` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meron_total_bet` double DEFAULT NULL,
  `wala_total_bet` double DEFAULT NULL,
  `total_bet` double DEFAULT NULL,
  `pasada` double DEFAULT NULL,
  `meron_probability` double DEFAULT NULL,
  `wala_probability` double DEFAULT NULL,
  `meron_odds` double DEFAULT NULL,
  `wala_odds` double DEFAULT NULL,
  `declaratorId` int(11) DEFAULT NULL,
  `pasada_percent` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sabong_histories`
--

INSERT INTO `sabong_histories` (`id`, `gameNo`, `result`, `meron_total_bet`, `wala_total_bet`, `total_bet`, `pasada`, `meron_probability`, `wala_probability`, `meron_odds`, `wala_odds`, `declaratorId`, `pasada_percent`, `created_at`, `updated_at`) VALUES
(1, 1, 'MERON', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL),
(2, 2, 'DRAW', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, '2023-07-20 04:30:41'),
(3, 3, 'MERON', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, '2023-07-20 04:30:41'),
(4, 4, 'MERON', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, '2023-07-20 04:30:41'),
(6, 5, 'WALA', 999.5, 999.5, 1999, 199.9, 0.55555555555556, 0.55555555555556, 1.8, 1.8, 0, 0.1, NULL, '2023-07-22 21:05:02'),
(7, 6, 'WALA', 109.5, 109.5, 219, 0, 0.5, 0.5, 2, 2, 0, 0, NULL, '2023-07-22 20:53:42'),
(8, 7, 'WALA', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, '2023-07-22 00:21:13'),
(9, 8, 'WALA', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, '2023-07-20 04:30:41'),
(10, 9, 'WALA', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, '2023-07-20 04:30:41'),
(11, 10, 'WALA', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, '2023-07-20 04:30:41'),
(18, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.1, '2023-07-23 00:18:07', NULL),
(19, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.1, '2023-07-23 00:18:07', NULL),
(20, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.1, '2023-07-23 00:18:07', NULL),
(21, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.1, '2023-07-23 00:18:07', NULL),
(22, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.1, '2023-07-23 00:18:07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sabong_transactions`
--

CREATE TABLE `sabong_transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `gameId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `bet` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bet_amount` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sabong_transactions`
--

INSERT INTO `sabong_transactions` (`id`, `gameId`, `userId`, `bet`, `bet_amount`, `status`, `created_at`, `updated_at`) VALUES
(77, 6, 1, 'MERON', '999.5', NULL, '2023-07-22 21:03:58', '2023-07-22 21:03:58'),
(78, 6, 1, 'WALA', '999.5', NULL, '2023-07-22 21:04:39', '2023-07-22 21:04:39');

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id` int(11) NOT NULL,
  `payload` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `stream_configuration`
--

CREATE TABLE `stream_configuration` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `gameTitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `streamID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `src` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passphrase` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `viewState` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expfights` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stream_configuration`
--

INSERT INTO `stream_configuration` (`id`, `gameTitle`, `streamID`, `title`, `src`, `passphrase`, `viewState`, `expfights`, `created_at`, `updated_at`) VALUES
(1, 'SABONG', 'MRLwgB4HRQkeUmbPXZS2aDbdqOz100yvX1BG17JJv68M', 'testStream', '', NULL, 'Public', 200, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_level` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `player_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pp_filepath` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `wallet_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `user_origin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `commission` double DEFAULT NULL,
  `isActive` int(11) DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `user_level`, `player_name`, `email`, `email_verified_at`, `password`, `pp_filepath`, `wallet_id`, `user_origin`, `commission`, `isActive`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Denmark', 'bettor', 'Denmark', 'denmarkcanete@gmail.com', NULL, '$2y$10$8iQGWEQo3DZtbGXfWMaI6uFSkZrVIoDZTDCkuZ679E1XoLyKn8aeK', '', '0', '3', NULL, NULL, NULL, NULL, NULL),
(2, 'declarator', 'declarator', 'declarator', 'declarator@gmail.com', NULL, '$2y$10$Gh8joAaVyR0ko6onTz8cf.rXIixD7twoyb1dw874Gd1nl7WmIMnAO', '', '0', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'agent', 'agent', 'agent', 'agent@gmail.com', NULL, '$2y$10$Gh8joAaVyR0ko6onTz8cf.rXIixD7twoyb1dw874Gd1nl7WmIMnAO', '', '0', '4', 0.3, NULL, NULL, NULL, NULL),
(4, 'superagent', 'super agent', 'superagent', 'superagent@gmail.com', NULL, '$2y$10$Gh8joAaVyR0ko6onTz8cf.rXIixD7twoyb1dw874Gd1nl7WmIMnAO', '', '0', NULL, 0.75, NULL, NULL, NULL, NULL),
(5, 'admin', 'admin', 'admin', 'admin@gmail.com', NULL, '$2y$10$Gh8joAaVyR0ko6onTz8cf.rXIixD7twoyb1dw874Gd1nl7WmIMnAO', '', '0', NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'agent', 'agent', 'agent', 'agent1@gmail.com', NULL, '$2y$10$Gh8joAaVyR0ko6onTz8cf.rXIixD7twoyb1dw874Gd1nl7WmIMnAO', '', '0', '3', 0.3, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wallets`
--

CREATE TABLE `wallets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sentTo` int(11) DEFAULT NULL,
  `receivedFrom` int(11) DEFAULT NULL,
  `gameCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gameId` int(11) DEFAULT NULL,
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdById` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wallets`
--

INSERT INTO `wallets` (`id`, `userId`, `amount`, `type`, `sentTo`, `receivedFrom`, `gameCode`, `gameId`, `remarks`, `createdById`, `created_at`, `updated_at`) VALUES
(208, 1, 20000, 'CASHIN', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(209, 0, 0.5, 'TEAM_FEE', 0, 1, 'SABONG', 6, NULL, 1, '2023-07-22 21:03:58', '2023-07-22 21:03:58'),
(210, 1, -0.5, 'TEAM_FEE', 0, NULL, 'SABONG', 6, NULL, 1, '2023-07-22 21:03:58', '2023-07-22 21:03:58'),
(211, 1, -999.5, 'BET', NULL, NULL, 'SABONG', 6, NULL, 1, '2023-07-22 21:03:58', '2023-07-22 21:03:58'),
(212, 0, 0.5, 'TEAM_FEE', 0, 1, 'SABONG', 6, NULL, 1, '2023-07-22 21:04:39', '2023-07-22 21:04:39'),
(213, 1, -0.5, 'TEAM_FEE', 0, NULL, 'SABONG', 6, NULL, 1, '2023-07-22 21:04:39', '2023-07-22 21:04:39'),
(214, 1, -999.5, 'BET', NULL, NULL, 'SABONG', 6, NULL, 1, '2023-07-22 21:04:39', '2023-07-22 21:04:39'),
(215, 1, 1799.1, 'RECEIVED', 1, NULL, 'SABONG', 6, 'GAME WIN', 1, '2023-07-22 21:05:02', '2023-07-22 21:05:02'),
(216, 3, 22.48875, 'AGENT_FEE', 3, 1, 'SABONG', 6, NULL, 1, '2023-07-22 21:05:02', '2023-07-22 21:05:02'),
(217, 4, 74.9625, 'MASTER_AGENT_FEE', 4, 3, 'SABONG', 6, NULL, 3, '2023-07-22 21:05:02', '2023-07-22 21:05:02'),
(218, 3, 22.48875, 'AGENT_FEE', 3, 1, 'SABONG', 6, NULL, 1, '2023-07-22 21:05:02', '2023-07-22 21:05:02'),
(219, 4, 74.9625, 'MASTER_AGENT_FEE', 4, 3, 'SABONG', 6, NULL, 3, '2023-07-22 21:05:02', '2023-07-22 21:05:02'),
(220, 3, -22.48875, 'WITHDRAW', 0, 0, '', 0, NULL, 3, '2023-07-22 21:05:02', '2023-07-22 21:05:02');

-- --------------------------------------------------------

--
-- Table structure for table `websockets_statistics_entries`
--

CREATE TABLE `websockets_statistics_entries` (
  `id` int(10) UNSIGNED NOT NULL,
  `app_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `peak_connections_count` int(11) NOT NULL,
  `websocket_messages_count` int(11) NOT NULL,
  `api_messages_count` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `websockets_statistics_entries`
--

INSERT INTO `websockets_statistics_entries` (`id`, `app_id`, `peak_connections_count`, `websocket_messages_count`, `api_messages_count`, `created_at`, `updated_at`) VALUES
(1, 'your_pusher_app_id', 0, 0, 0, '2023-07-22 16:52:13', '2023-07-22 16:52:13'),
(2, 'your_pusher_app_id', 0, 0, 0, '2023-07-22 16:57:13', '2023-07-22 16:57:13'),
(3, 'local', 0, 0, 0, '2023-07-22 17:08:19', '2023-07-22 17:08:19'),
(4, 'local', 0, 0, 0, '2023-07-22 17:18:38', '2023-07-22 17:18:38'),
(5, 'local', 1, 1, 0, '2023-07-22 17:35:20', '2023-07-22 17:35:20'),
(6, 'local', 1, 1, 0, '2023-07-22 17:44:03', '2023-07-22 17:44:03');

-- --------------------------------------------------------

--
-- Table structure for table `withdraw_requests`
--

CREATE TABLE `withdraw_requests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `middleName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phoneNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `request_amount` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approvedById` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `withdraw_requests`
--

INSERT INTO `withdraw_requests` (`id`, `status`, `userId`, `firstName`, `middleName`, `lastName`, `email`, `phoneNo`, `request_amount`, `approvedById`, `created_at`, `updated_at`) VALUES
(10, 'REQUEST', 1, 'Denmark', 'dacut', 'Cañete', 'denmarkcanete@gmail.com', '123', '200', 3, '2023-07-20 07:53:04', '2023-07-20 07:53:04'),
(11, 'REQUEST', 1, 'Denmark', 'dacut', 'Cañete', 'denmarkcanete@gmail.com', '123', '100', 3, '2023-07-20 07:54:36', '2023-07-20 07:54:36'),
(12, 'REQUEST', 1, 'qwe', 'qwe', 'qwe', 'denmarkcanete@gmail.com', '321', '123', 3, '2023-07-20 08:11:57', '2023-07-20 08:11:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `referral_codes`
--
ALTER TABLE `referral_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sabong_histories`
--
ALTER TABLE `sabong_histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sabong_transactions`
--
ALTER TABLE `sabong_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stream_configuration`
--
ALTER TABLE `stream_configuration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `websockets_statistics_entries`
--
ALTER TABLE `websockets_statistics_entries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `withdraw_requests`
--
ALTER TABLE `withdraw_requests`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `referral_codes`
--
ALTER TABLE `referral_codes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sabong_histories`
--
ALTER TABLE `sabong_histories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `sabong_transactions`
--
ALTER TABLE `sabong_transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stream_configuration`
--
ALTER TABLE `stream_configuration`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=221;

--
-- AUTO_INCREMENT for table `websockets_statistics_entries`
--
ALTER TABLE `websockets_statistics_entries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `withdraw_requests`
--
ALTER TABLE `withdraw_requests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
