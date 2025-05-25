-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Време на генериране: 25 май 2025 в 15:17
-- Версия на сървъра: 10.4.32-MariaDB
-- Версия на PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данни: `dzi_2501`
--

-- --------------------------------------------------------

--
-- Структура на таблица `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура на таблица `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура на таблица `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add Пофил на потребител', 7, 'add_userprofile'),
(26, 'Can change Пофил на потребител', 7, 'change_userprofile'),
(27, 'Can delete Пофил на потребител', 7, 'delete_userprofile'),
(28, 'Can view Пофил на потребител', 7, 'view_userprofile');

-- --------------------------------------------------------

--
-- Структура на таблица `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(2, 'pbkdf2_sha256$600000$qjUdnB5sHFwdCJPZYNRrjq$LZTvr/Vfj1qFXylwY/VAuOAUcNtnktS1aaOu4q5fbHk=', '2025-05-25 13:15:00.105064', 1, 'dzi_25', 'Мирослава', 'Тодева', '', 1, 1, '2025-04-12 19:40:56.000000'),
(3, 'pbkdf2_sha256$600000$W0qM6CKHTUidgceWdUUcig$bz/PC1UxB6MelSjRi9YYfgZ+EX1+h8JGGrXOZehltLQ=', '2025-04-15 20:28:25.463300', 0, 'user1', 'Иван', 'Петров', 'abv@abv.bg', 0, 1, '2025-04-15 07:44:43.000000');

-- --------------------------------------------------------

--
-- Структура на таблица `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура на таблица `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура на таблица `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2025-04-13 13:01:56.971719', '2', 'dzi_25', 2, '[{\"changed\": {\"fields\": [\"First name\", \"Last name\"]}}]', 4, 2),
(2, '2025-04-15 07:42:37.154091', '2', 'dzi_25', 2, '[]', 4, 2),
(3, '2025-04-15 07:44:43.551813', '3', 'user1', 1, '[{\"added\": {}}]', 4, 2),
(4, '2025-04-15 20:27:04.509333', '3', 'user1', 2, '[{\"changed\": {\"fields\": [\"password\"]}}]', 4, 2),
(5, '2025-04-15 20:27:42.400662', '3', 'user1', 2, '[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Email address\"]}}]', 4, 2);

-- --------------------------------------------------------

--
-- Структура на таблица `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(7, 'main', 'userprofile'),
(6, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Структура на таблица `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2025-03-31 17:42:12.184459'),
(2, 'auth', '0001_initial', '2025-03-31 17:42:12.759646'),
(3, 'admin', '0001_initial', '2025-03-31 17:42:12.889263'),
(4, 'admin', '0002_logentry_remove_auto_add', '2025-03-31 17:42:12.896323'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2025-03-31 17:42:12.904176'),
(6, 'contenttypes', '0002_remove_content_type_name', '2025-03-31 17:42:12.980396'),
(7, 'auth', '0002_alter_permission_name_max_length', '2025-03-31 17:42:13.050719'),
(8, 'auth', '0003_alter_user_email_max_length', '2025-03-31 17:42:13.067790'),
(9, 'auth', '0004_alter_user_username_opts', '2025-03-31 17:42:13.074794'),
(10, 'auth', '0005_alter_user_last_login_null', '2025-03-31 17:42:13.121732'),
(11, 'auth', '0006_require_contenttypes_0002', '2025-03-31 17:42:13.125745'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2025-03-31 17:42:13.132791'),
(13, 'auth', '0008_alter_user_username_max_length', '2025-03-31 17:42:13.146442'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2025-03-31 17:42:13.164688'),
(15, 'auth', '0010_alter_group_name_max_length', '2025-03-31 17:42:13.181786'),
(16, 'auth', '0011_update_proxy_permissions', '2025-03-31 17:42:13.191878'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2025-03-31 17:42:13.207783'),
(18, 'sessions', '0001_initial', '2025-03-31 17:42:13.240926'),
(19, 'main', '0001_initial', '2025-04-12 12:08:19.336484'),
(20, 'main', '0002_remove_userprofile_session_theme_and_more', '2025-04-13 14:16:29.739636');

-- --------------------------------------------------------

--
-- Структура на таблица `django_session`
--

DROP TABLE IF EXISTS `django_session`;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('f6wqqdp9o8rwa4cz5ldq08pgdqimkzes', '.eJxVjDsOwjAQRO_iGln-fyjpcwZr7d3gAHKkOKkQdyeRUkA5897MmyXY1pq2TkuakF2ZYpffLkN5UjsAPqDdZ17mti5T5ofCT9r5MCO9bqf7d1Ch131dBAjtUCnhRYnaaPShyDFKyHtGkME66YKhKGyUykQrAPwoiUzWRIF9vsF2Nzg:1u4b0z:Apkc3vGzdxR4ZMAaKawspBeJ4d_JyU9-Zomw8ZLHPEE', '2025-04-29 07:47:29.674143'),
('nble6eeqrtwhc3bs3gr8oq0fpxq6lt6t', '.eJxVjDsOwjAQRO_iGln-fyjpcwZr7d3gAHKkOKkQdyeRUkA5897MmyXY1pq2TkuakF2ZYpffLkN5UjsAPqDdZ17mti5T5ofCT9r5MCO9bqf7d1Ch131dBAjtUCnhRYnaaPShyDFKyHtGkME66YKhKGyUykQrAPwoiUzWRIF9vsF2Nzg:1uHfH6:S9J-_HjUwScrkC2wBB0JIdX1xc-dRFUK39Sz0SKT638', '2025-06-04 08:58:08.923034'),
('nplujnpstphptk9ssy8g6070si8zfu0t', '.eJxVjDsOwjAQRO_iGln-fyjpcwZr7d3gAHKkOKkQdyeRUkA5897MmyXY1pq2TkuakF2ZYpffLkN5UjsAPqDdZ17mti5T5ofCT9r5MCO9bqf7d1Ch131dBAjtUCnhRYnaaPShyDFKyHtGkME66YKhKGyUykQrAPwoiUzWRIF9vsF2Nzg:1u9Bct:V_mlR4SipecUgXd1yKx9BYZBfaNcIDkpsQ_JIwqP5V0', '2025-05-11 23:41:35.781916'),
('pdaqcwmyrbyv4io1wr6a00phmvty3wxq', 'e30:1u3gVx:4HdBIuSyFP5jZGHivt22oPdPGBFyw62vobsCmB6q3Fc', '2025-04-26 19:27:41.427382'),
('w8cgcti7om15jbif31s9tf0gfunk15cs', 'e30:1u3gW8:USWOXp1d4U7PJ3xCUnKvMPWjo0McxRcC8GO-yVJIoCE', '2025-04-26 19:27:52.327071'),
('wuplyd5udicbr0hn1vybf7iejxxeov0w', 'e30:1u3weJ:YJavON9PKS_jgKiSfK5uDQYAISZ0nRxvnpDHL2twBLc', '2025-04-27 12:41:23.357385'),
('zdtvnvej1ychwbemmsn87c3lq3g7bps3', '.eJxVjMsOwiAQRf-FtSE8R3Dpvt9AhgGkaiAp7cr479qkC93ec859sYDbWsM28hLmxC5MstPvFpEeue0g3bHdOqfe1mWOfFf4QQefesrP6-H-HVQc9Vufk_RIQkFBa7REcMoXkTRkAEfWC-Vk9IiAGoCys1ScTSRMjlK4aNj7A9MgN6M:1tzWi9:EQEz1XBlaOIP6f6C6cGNCMNUEI0FNbied7Dz9xBjUKs', '2025-04-15 08:11:05.968067');

-- --------------------------------------------------------

--
-- Структура на таблица `main_userprofile`
--

DROP TABLE IF EXISTS `main_userprofile`;
CREATE TABLE `main_userprofile` (
  `id` bigint(20) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `access_level` smallint(5) UNSIGNED NOT NULL CHECK (`access_level` >= 0),
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `main_userprofile`
--

INSERT INTO `main_userprofile` (`id`, `gender`, `access_level`, `user_id`) VALUES
(1, 1, 1, 2),
(2, 1, 3, 3);

--
-- Indexes for dumped tables
--

--
-- Индекси за таблица `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индекси за таблица `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Индекси за таблица `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Индекси за таблица `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Индекси за таблица `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Индекси за таблица `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Индекси за таблица `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Индекси за таблица `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Индекси за таблица `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Индекси за таблица `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Индекси за таблица `main_userprofile`
--
ALTER TABLE `main_userprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `main_userprofile`
--
ALTER TABLE `main_userprofile`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ограничения за дъмпнати таблици
--

--
-- Ограничения за таблица `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Ограничения за таблица `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Ограничения за таблица `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Ограничения за таблица `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Ограничения за таблица `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Ограничения за таблица `main_userprofile`
--
ALTER TABLE `main_userprofile`
  ADD CONSTRAINT `main_userprofile_user_id_15c416f4_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
