CREATE TABLE venues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    capacity_group VARCHAR(10) NOT NULL, -- 'below60' or 'above60'
    status VARCHAR(10) DEFAULT 'available' -- 'available' or 'booked'
);
INSERT INTO venues (name, capacity_group, status) VALUES
('CG1', 'below60', 'available'),
('CG2', 'below60', 'available'),
('CG3', 'below60', 'available'),
('CG4', 'below60', 'available'),
('CG5', 'below60', 'available'),
('RCH1', 'above60', 'available'),
('RCH2', 'above60', 'available'),
('RCH3', 'above60', 'available'),
('RCH4', 'above60', 'available'),
('RCH5', 'above60', 'available'),
('RCH6', 'above60', 'available'),
('RCH7', 'above60', 'available');
