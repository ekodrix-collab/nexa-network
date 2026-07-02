CREATE TABLE IF NOT EXISTS `AdminUser` (
  `id` VARCHAR(191) NOT NULL,
  `username` VARCHAR(191) NOT NULL UNIQUE,
  `password` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `HomePageContent` (
  `id` VARCHAR(191) NOT NULL DEFAULT 'default_home',
  `heroTitle` VARCHAR(191) NOT NULL,
  `heroSubtitle` VARCHAR(191) NOT NULL,
  `heroDescription` TEXT NOT NULL,
  `heroVideo` VARCHAR(191) NULL,
  `heroImage` VARCHAR(191) NULL,
  `statsYearsExp` INT NOT NULL DEFAULT 0,
  `statsProjects` INT NOT NULL DEFAULT 0,
  `statsClients` INT NOT NULL DEFAULT 0,
  `statsExperts` INT NOT NULL DEFAULT 0,
  `welcomeTitle` VARCHAR(191) NOT NULL,
  `welcomeDescription` TEXT NOT NULL,
  `welcomeImage` VARCHAR(191) NULL,
  `welcomeIcon` VARCHAR(191) NULL,
  `ctaTitle` VARCHAR(191) NOT NULL,
  `ctaDescription` TEXT NOT NULL,
  `ctaBgImage` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `AboutPageContent` (
  `id` VARCHAR(191) NOT NULL DEFAULT 'default_about',
  `title` VARCHAR(191) NOT NULL,
  `subtitle` VARCHAR(191) NULL DEFAULT 'About Us',
  `description` TEXT NOT NULL,
  `bgImage` VARCHAR(191) NULL,
  `whoWeAreTitle` VARCHAR(191) NULL DEFAULT 'Providing Enterprise-Grade Connectivity & Defense',
  `whoWeAreDescription1` TEXT NULL,
  `whoWeAreDescription2` TEXT NULL,
  `whoWeAreDescription3` TEXT NULL,
  `whoWeAreImage` VARCHAR(191) NULL,
  `values` JSON NULL,
  `whyChooseUsTitle` VARCHAR(191) NULL DEFAULT 'Your Trusted Partner for Technology-Driven Transformation',
  `whyChooseUsImage` VARCHAR(191) NULL,
  `benefits` JSON NULL,
  `testimonials` JSON NULL,
  `ctaTitle` VARCHAR(191) NULL DEFAULT 'Ready to Get Started?',
  `ctaDescription` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ContactInfo` (
  `id` VARCHAR(191) NOT NULL DEFAULT 'default_contact',
  `title` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `bgImage` VARCHAR(191) NULL,
  `bannerImage` VARCHAR(191) NULL,
  `email1` VARCHAR(191) NOT NULL,
  `email2` VARCHAR(191) NULL,
  `phone1` VARCHAR(191) NOT NULL,
  `phone2` VARCHAR(191) NULL,
  `address` TEXT NOT NULL,
  `facebook` VARCHAR(191) NULL,
  `twitter` VARCHAR(191) NULL,
  `linkedin` VARCHAR(191) NULL,
  `instagram` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Service` (
  `id` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `title` VARCHAR(191) NOT NULL,
  `subtitle` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `icon` VARCHAR(191) NOT NULL,
  `features` JSON NOT NULL,
  `orderIndex` INT NOT NULL DEFAULT 0,
  `active` TINYINT(1) NOT NULL DEFAULT 1,
  `imageUrl` VARCHAR(191) NULL,
  `heroTitle` VARCHAR(191) NULL,
  `heroHighlight` VARCHAR(191) NULL,
  `heroDescription` TEXT NULL,
  `heroImage` VARCHAR(191) NULL,
  `stats` JSON NULL,
  `overviewTitle` VARCHAR(191) NULL,
  `overviewDescription` TEXT NULL,
  `overviewImage` VARCHAR(191) NULL,
  `partners` JSON NULL,
  `projects` JSON NULL,
  `faqs` JSON NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Project` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `client` VARCHAR(191) NOT NULL,
  `category` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `imageUrl` VARCHAR(191) NULL,
  `tags` JSON NOT NULL,
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `orderIndex` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Contact` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(191) NULL,
  `company` VARCHAR(191) NULL,
  `service` VARCHAR(191) NULL,
  `message` TEXT NOT NULL,
  `status` VARCHAR(191) NOT NULL DEFAULT 'new',
  `ipAddress` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `BlogPost` (
  `id` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `title` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `readTime` VARCHAR(191) NOT NULL,
  `imageUrl` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Career` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `department` VARCHAR(191) NOT NULL,
  `location` VARCHAR(191) NOT NULL,
  `type` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `requirements` TEXT NOT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT 1,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
