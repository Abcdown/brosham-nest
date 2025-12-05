-- Gallery Table Creation
-- This table stores all gallery images for Brosham Properties

CREATE TABLE IF NOT EXISTS `gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `image_url` varchar(500) NOT NULL,
  `category` varchar(100) DEFAULT 'General',
  `location` varchar(255) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_featured` tinyint(1) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_category` (`category`),
  KEY `idx_display_order` (`display_order`),
  KEY `idx_is_featured` (`is_featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data (optional - using the existing images from the current Gallery.tsx)
INSERT INTO `gallery` (`title`, `description`, `image_url`, `category`, `location`, `display_order`, `is_featured`, `status`) VALUES
('Modern House Exterior', 'Beautiful modern house with landscaping', '/src/assets/house-exterior-1.jpg', 'Exteriors', 'Johor Bahru, Johor', 1, 1, 'active'),
('Modern Living Room', 'Elegant living space with modern furnishing', '/src/assets/house-interior-1.jpg', 'Interiors', 'Johor Bahru, Johor', 2, 1, 'active'),
('Luxury Villa with Pool', 'Premium villa with swimming pool and modern design', '/src/assets/house-exterior-2.jpg', 'Exteriors', 'Johor Bahru, Johor', 3, 1, 'active'),
('Contemporary Kitchen', 'Modern kitchen with granite countertops and appliances', '/src/assets/house-interior-2.jpg', 'Interiors', 'Johor Bahru, Johor', 4, 1, 'active'),
('House Renovation Project', 'Complete house transformation and renovation', '/src/assets/house-flip-1.jpg', 'Flipping Projects', 'Johor Bahru, Johor', 5, 1, 'active'),
('Bathroom Renovation', 'Modern bathroom renovation with premium fixtures', '/src/assets/house-flip-2.jpg', 'Flipping Projects', 'Johor Bahru, Johor', 6, 1, 'active');
